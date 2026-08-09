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

const payrollDates = [
  "2026-01-31", "2026-02-28", "2026-03-31", "2026-04-30",
  "2026-05-31", "2026-06-30", "2026-07-31", "2026-08-01",
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
    { name: "Namal Perera", email: "namal@teafactory.lk", phone: "0711234567", gender: "male", age: "34", role: "HR Manager" },
    { name: "Kavinda Silva", email: "kavinda@teafactory.lk", phone: "0722345678", gender: "male", age: "29", role: "Inventory Manager" },
    { name: "Aruna Bandara", email: "aruna@teafactory.lk", phone: "0733456789", gender: "male", age: "41", role: "Suplier Manager" },
    { name: "Tharindu Jayawardena", email: "tharindu@teafactory.lk", phone: "0744567890", gender: "male", age: "36", role: "Production Manager" },
    { name: "Sanduni Weerasinghe", email: "sanduni@teafactory.lk", phone: "0755678901", gender: "female", age: "26", role: "HR Assistant" },
    { name: "Nadeesha Fernando", email: "nadeesha@teafactory.lk", phone: "0766789012", gender: "female", age: "31", role: "Inventory Clerk" },
    { name: "Ruwan Wijesinghe", email: "ruwan@teafactory.lk", phone: "0777890123", gender: "male", age: "38", role: "Production Worker" },
    { name: "Ishara Gunasekara", email: "ishara@teafactory.lk", phone: "0788901234", gender: "female", age: "27", role: "Quality Inspector" },
  ].map((e, i) => ({ ...e, password, img: IMG, createdAt: empDates[i], updatedAt: empDates[i] }));

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

  const payrollSeeds = [
    { empName: "Namal Perera", empId: "E001", basicSalary: 85000, overtime: 5000, bonus: 10000, totoalEarnings: 100000, fedaralTax: 10000, stateTax: 5000, medicare: 2000, totalDeduction: 17000, netPay: 83000 },
    { empName: "Kavinda Silva", empId: "E002", basicSalary: 80000, overtime: 4000, bonus: 8000, totoalEarnings: 92000, fedaralTax: 9200, stateTax: 4600, medicare: 1840, totalDeduction: 15640, netPay: 76360 },
    { empName: "Aruna Bandara", empId: "E003", basicSalary: 78000, overtime: 3000, bonus: 5000, totoalEarnings: 86000, fedaralTax: 8600, stateTax: 4300, medicare: 1720, totalDeduction: 14620, netPay: 71380 },
    { empName: "Tharindu Jayawardena", empId: "E004", basicSalary: 82000, overtime: 6000, bonus: 9000, totoalEarnings: 97000, fedaralTax: 9700, stateTax: 4850, medicare: 1940, totalDeduction: 16490, netPay: 80510 },
    { empName: "Sanduni Weerasinghe", empId: "E005", basicSalary: 65000, overtime: 2000, bonus: 3000, totoalEarnings: 70000, fedaralTax: 7000, stateTax: 3500, medicare: 1400, totalDeduction: 11900, netPay: 58100 },
    { empName: "Nadeesha Fernando", empId: "E006", basicSalary: 60000, overtime: 1000, bonus: 2000, totoalEarnings: 63000, fedaralTax: 6300, stateTax: 3150, medicare: 1260, totalDeduction: 10710, netPay: 52290 },
    { empName: "Ruwan Wijesinghe", empId: "E007", basicSalary: 55000, overtime: 8000, bonus: 1500, totoalEarnings: 64500, fedaralTax: 6450, stateTax: 3225, medicare: 1290, totalDeduction: 10965, netPay: 53535 },
    { empName: "Ishara Gunasekara", empId: "E008", basicSalary: 70000, overtime: 2500, bonus: 4000, totoalEarnings: 76500, fedaralTax: 7650, stateTax: 3825, medicare: 1530, totalDeduction: 13005, netPay: 63495 },
  ].map((p, i) => ({ ...p, createdAt: payrollDates[i], updatedAt: payrollDates[i] }));

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
    employees: (await Employee.insertMany(employeeSeeds, { timestamps: false })).length,
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
