const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Employee = require("./models/employeeModel");
const Inventory = require("./models/inventoryModel");
const Payroll = require("./models/payrollModel");
const Production = require("./models/productionModel");
const Suplier = require("./models/SuplierModel");

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/Tea-Factory";

const IMG = "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const empDates = [
  "2026-01-15", "2026-02-10", "2026-03-05", "2026-04-20",
  "2026-05-12", "2026-06-18", "2026-07-08", "2026-08-02",
];

const payrollMonths = [
  "2026-01", "2026-02", "2026-03", "2026-04",
  "2026-05", "2026-06", "2026-07", "2026-08",
];

async function seed() {
  await mongoose.connect(MONGODB_URI);
  console.log("connected:", mongoose.connection.host, "/", mongoose.connection.name);

  await Promise.all([
    Employee.deleteMany({}),
    Inventory.deleteMany({}),
    Payroll.deleteMany({}),
    Production.deleteMany({}),
    Suplier.deleteMany({}),
  ]);

  const password = bcrypt.hashSync("1234", 10);

  const employeeSeeds = [
    { name: "Namal Perera", email: "namal@teafactory.lk", phone: "0711234567", gender: "male", age: 34, role: "HR Manager", department: "General", position: "HR Manager", basicSalary: 85000 },
    { name: "Kavinda Silva", email: "kavinda@teafactory.lk", phone: "0722345678", gender: "male", age: 29, role: "Inventory Manager", department: "Warehouse", position: "Inventory Manager", basicSalary: 80000 },
    { name: "Aruna Bandara", email: "aruna@teafactory.lk", phone: "0733456789", gender: "male", age: 41, role: "Suplier Manager", department: "General", position: "Suplier Manager", basicSalary: 78000 },
    { name: "Tharindu Jayawardena", email: "tharindu@teafactory.lk", phone: "0744567890", gender: "male", age: 36, role: "Production Manager", department: "Production", position: "Production Manager", basicSalary: 82000 },
    { name: "Sanduni Weerasinghe", email: "sanduni@teafactory.lk", phone: "0755678901", gender: "female", age: 26, role: "HR Assistant", department: "General", position: "HR Assistant", basicSalary: 65000 },
    { name: "Nadeesha Fernando", email: "nadeesha@teafactory.lk", phone: "0766789012", gender: "female", age: 31, role: "Inventory Clerk", department: "Warehouse", position: "Inventory Clerk", basicSalary: 60000 },
    { name: "Ruwan Wijesinghe", email: "ruwan@teafactory.lk", phone: "0777890123", gender: "male", age: 38, role: "Production Worker", department: "Production", position: "Production Worker", basicSalary: 55000 },
    { name: "Ishara Gunasekara", email: "ishara@teafactory.lk", phone: "0788901234", gender: "female", age: 27, role: "Quality Inspector", department: "Quality", position: "Quality Inspector", basicSalary: 70000 },
  ].map((e, i) => ({
    ...e,
    employeeId: `E${String(i + 1).padStart(3, "0")}`,
    nic: `90${String(900000000 + i * 111111).padStart(9, "0")}`,
    epfNo: `EPF-${String(i + 1).padStart(4, "0")}`,
    bankAccount: `1001-${String(234567 + i * 111111)}`,
    address: `${i + 1} Estate Lane, Tea Valley`,
    hireDate: empDates[i],
    password,
    img: IMG,
    createdAt: empDates[i],
    updatedAt: empDates[i],
  }));

  const inventorySeeds = [
    { Id: "INV-001", name: "Fresh Tea Leaves", description: "Freshly plucked green leaf from estate", quantity: 1200, location: "Factory Warehouse A", inTime: "2026-08-01 06:00", outTime: "", supplier: "Uva Highlands Estates" },
    { Id: "INV-002", name: "Dried Tea Leaves", description: "Withered and dried leaf ready for processing", quantity: 800, location: "Factory Warehouse A", inTime: "2026-08-02 08:00", outTime: "", supplier: "Uva Highlands Estates" },
    { Id: "INV-003", name: "Fertilizer", description: "NPK fertilizer for estate application", quantity: 50, location: "Storage Shed B", inTime: "2026-07-20 10:00", outTime: "", supplier: "Green Valley Suppliers" },
    { Id: "INV-004", name: "Packaging Boxes", description: "Standard export tea cartons", quantity: 400, location: "Storage Shed B", inTime: "2026-07-25 09:00", outTime: "", supplier: "Ceylon Packaging Co" },
    { Id: "INV-005", name: "Tea Bags", description: "Empty pyramid tea bags", quantity: 300, location: "Factory Warehouse A", inTime: "2026-07-30 11:00", outTime: "", supplier: "Global Trading House" },
    { Id: "INV-006", name: "Plastic Packaging", description: "Heat-seal plastic pouches", quantity: 500, location: "Storage Shed B", inTime: "2026-08-03 14:00", outTime: "", supplier: "Ceylon Packaging Co" },
    { Id: "INV-007", name: "Labels", description: "Branded tea labels", quantity: 300, location: "Storage Shed B", inTime: "2026-08-04 15:00", outTime: "", supplier: "Global Trading House" },
    { Id: "INV-008", name: "Fertilizer Bags", description: "Burlap bags for leaf collection", quantity: 120, location: "Storage Shed B", inTime: "2026-07-22 16:00", outTime: "", supplier: "Green Valley Suppliers" },
    { Id: "INV-009", name: "Organic Pesticide", description: "Neem-based organic pesticide", quantity: 30, location: "Storage Shed C", inTime: "2026-07-28 13:00", outTime: "", supplier: "Agro Chem Solutions" },
    { Id: "INV-010", name: "Cardboard Boxes", description: "Recycled cardboard export boxes", quantity: 250, location: "Factory Warehouse A", inTime: "2026-08-05 10:00", outTime: "", supplier: "Ceylon Packaging Co" },
  ];

  const employees = await Employee.insertMany(employeeSeeds, { timestamps: false });

  const payrollSeeds = employees.map((emp, i) => {
    const basicSalary = emp.basicSalary;
    const overtime = 2000 + i * 1000;
    const bonus = 1500 + i * 1200;
    const totalEarnings = basicSalary + overtime + bonus;
    const epfEmployee = Math.round(basicSalary * 0.08);
    const epfEmployer = Math.round(basicSalary * 0.12);
    const etf = Math.round(basicSalary * 0.03);
    const apitTax = Math.round(totalEarnings * 0.06);
    const loanDeduction = 0;
    const totalDeduction = epfEmployee + apitTax + loanDeduction;
    const netPay = totalEarnings - totalDeduction;
    const period = payrollMonths[i];
    return {
      employee: emp._id,
      employeeName: emp.name,
      period,
      basicSalary,
      overtimeHours: Math.round(overtime / 1250),
      overtimeRate: 1250,
      overtime,
      allowances: 0,
      bonus,
      epfEmployee,
      epfEmployer,
      etf,
      apitTax,
      loanDeduction,
      totalEarnings,
      totalDeduction,
      netPay,
      status: i % 3 === 0 ? "pending" : "paid",
      paidOn: i % 3 === 0 ? null : `${period}-28`,
      createdAt: `${period}-28`,
      updatedAt: `${period}-28`,
    };
  });

  const productionSeeds = [
    { ProdutionID: "PRO-001", description: "First flush black tea production", startDate: "2026-05-01", endDate: "2026-05-15", status: "Completed", teaType: "Black Tea", batchNumber: "BT-2026-001" },
    { ProdutionID: "PRO-002", description: "Green tea processing batch", startDate: "2026-06-01", endDate: "2026-06-20", status: "Completed", teaType: "Green Tea", batchNumber: "GT-2026-002" },
    { ProdutionID: "PRO-003", description: "Oolong tea rolling and oxidation", startDate: "2026-07-05", endDate: "2026-07-25", status: "Completed", teaType: "Oolong Tea", batchNumber: "OL-2026-003" },
    { ProdutionID: "PRO-004", description: "White tea minimal processing", startDate: "2026-08-01", endDate: "2026-08-20", status: "In Progress", teaType: "White Tea", batchNumber: "WT-2026-004" },
    { ProdutionID: "PRO-005", description: "Herbal tea blend packaging", startDate: "2026-09-01", endDate: "2026-09-15", status: "Pending", teaType: "Herbal Tea", batchNumber: "HT-2026-005" },
  ];

  const suplierSeeds = [
    { name: "Green Valley Suppliers", item: "Fertilizer", address: "Kandy Road, Gampola", phone: "0712345678", email: "greenvalley@example.com", bank: "Commercial Bank", bankNo: "1001-2345-6789" },
    { name: "Ceylon Packaging Co", item: "Packaging Boxes", address: "Colombo 11", phone: "0771122334", email: "packaging@ceylon.com", bank: "Bank of Ceylon", bankNo: "2002-3456-7890" },
    { name: "Uva Highlands Estates", item: "Tea Leaves", address: "Badulla", phone: "0764455667", email: "uva@estates.com", bank: "People's Bank", bankNo: "3003-4567-8901" },
    { name: "Agro Chem Solutions", item: "Organic Pesticide", address: "Kurunegala", phone: "0755566778", email: "agrochem@example.com", bank: "NSB", bankNo: "4004-5678-9012" },
    { name: "Global Trading House", item: "Tea Bags", address: "Colombo 03", phone: "0706677889", email: "global@trading.com", bank: "Sampath Bank", bankNo: "5005-6789-0123" },
  ];

  const counts = {
    employees: employees.length,
    inventory: (await Inventory.insertMany(inventorySeeds)).length,
    payrolls: (await Payroll.insertMany(payrollSeeds, { timestamps: false })).length,
    productions: (await Production.insertMany(productionSeeds)).length,
    supliers: (await Suplier.insertMany(suplierSeeds)).length,
  };

  console.log("seeded:", counts);
  await mongoose.disconnect();
}

seed()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
