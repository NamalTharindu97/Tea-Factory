const Payroll = require("../models/payrollModel");
const Employe = require("../models/employeeModel");
const Production = require("../models/productionModel");

const server = require("../server");

describe("getPayroll", () => {
  it("should return all payrolls", async () => {
    const payrolls = await Payroll.find();
    expect(payrolls).toHaveLength(9);
  });
});

describe("createPayroll", () => {
  it("should create a new payroll", async () => {
    const payroll = {
      empName: "Kamal",
      empId: "Emp-5",
      basicSalary: 50000,
      overtime: 10000,
      bonus: 5000,
      totoalEarnings: 65000,
      fedaralTax: 1000,
      stateTax: 1000,
      medicare: 1000,
      totalDeduction: 3000,
      netPay: 62000,
    };

    try {
      const createdPayroll = await Payroll.create(payroll);
      expect(createdPayroll).toHaveProperty("empName", "Kamal");
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
});

describe("getSinglePayroll", () => {
  it("should return a single payroll by id", async () => {
    const testPayroll = await Payroll.findOne({ empName: "Kamal" });
    const testPayrollID = testPayroll._id;

    const payroll = await Payroll.findById(testPayrollID);
    expect(payroll).toHaveProperty("empName", "Kamal");
  });

  it("should return 404 if payroll is not found", async () => {
    const payroll = await Payroll.findById("645245aafa72385acd6f5c45");
    expect(payroll).toBeNull();
  });
});

describe("updatePayroll", () => {
  it("should update a payroll", async () => {
    const payroll = {
      empName: "Kamal",
      empId: "Test_1", //updated
      basicSalary: 70000, //updated
      overtime: 10000,
      bonus: 5000,
      totoalEarnings: 65000,
      fedaralTax: 1000,
      stateTax: 1000,
      medicare: 1000,
      totalDeduction: 3000,
      netPay: 62000,
    };

    const testPayroll = await Payroll.findOne({ empName: "Kamal" });
    const testPayrollID = testPayroll._id;

    const updatedPayroll = await Payroll.findByIdAndUpdate(testPayrollID, payroll, {
      new: true,
    });
    expect(updatedPayroll).toHaveProperty("empId", "Test_1");
    expect(updatedPayroll).toHaveProperty("basicSalary", 70000);
  });

  it("should return 400 if payroll is not found", async () => {
    const payroll = {
      empName: "Kamal",
      empId: "Emp-6", //updated
      basicSalary: 50000,
      overtime: 10000,
      bonus: 5000,
      totoalEarnings: 65000,
      fedaralTax: 1000,
      stateTax: 1000,
      medicare: 1000,
      totalDeduction: 3000,
      netPay: 62000,
    };

    const updatedPayroll = await Payroll.findByIdAndUpdate("645245aafa72385acd6f5c42", payroll);
  });
});

describe("deletePayroll", () => {
  it("should delete a payroll", async () => {
    const payroll = await Payroll.findOne({ empName: "Kamal" });
    const payrollId = payroll._id;

    const deletedPayroll = await Payroll.findByIdAndDelete(payrollId);
    expect(deletedPayroll).toBeTruthy();
  });

  it("should return 404 if payroll is not found", async () => {
    const deletedPayroll = await Payroll.findByIdAndDelete("647086937a12fcb3fd3440d5");
    expect(deletedPayroll).toBeNull();
  });
});

//************************************Employee test cases**********************************************************

describe("getEmployee", () => {
  it("should return all employees", async () => {
    const employees = await Employe.find();
    expect(employees).toHaveLength(13);
  });
});

describe("createEmployee", () => {
  it("should create a new Employee", async () => {
    const employe = {
      name: "Test User",
      email: "TestUser@gmail.com",
      phone: "0772417049",
      gender: "male",
      img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      age: "25",
      role: "HR Manager",
      password: "12345",
    };

    try {
      const createdEmployee = await Employe.create(employe);
      expect(createdEmployee).toHaveProperty("name", "Test User");
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
});

describe("getSingleEmploye", () => {
  it("should return a single payroll by id", async () => {
    const testUser = await Employe.findOne({ name: "Test User" });
    const testUserID = testUser._id;

    const employe = await Employe.findById(testUserID);
    expect(employe).toHaveProperty("name", "Test User");
  });

  it("should return 404 if payroll is not found", async () => {
    const payroll = await Employe.findById("64677989f12048fa998ad2de");
    expect(payroll).toBeNull();
  });
});

describe("updateEmploye", () => {
  it("should update a Employe", async () => {
    const employe = {
      name: "Test User",
      email: "TestUser@gmail.com",
      phone: "0772417049",
      gender: "male",
      img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      age: "25",
      role: "Inventory Manager", //updated
      password: "12345",
    };

    const testUser = await Employe.findOne({ name: "Test User" });
    const testUserID = testUser._id;

    const updatedEmploye = await Employe.findByIdAndUpdate(testUserID, employe, {
      new: true,
    });
    expect(updatedEmploye).toHaveProperty("role", "Inventory Manager");
  });
});

describe("deleteEmploye", () => {
  it("should delete a Employe", async () => {
    const testUser = await Employe.findOne({ name: "Test User" });
    const testUserID = testUser._id;

    const deletedEmploye = await Employe.findByIdAndDelete(testUserID);
    expect(deletedEmploye).toBeTruthy();
  });

  it("should return 404 if payroll is not found", async () => {
    const deletedEmploye = await Employe.findByIdAndDelete("646a0970e0df889ab9516322");
    expect(deletedEmploye).toBeNull();
  });
});

//************************************Production test cases**********************************************************

describe("createProduction", () => {
  it("should create a new Employee", async () => {
    const production = {
      ProdutionID: "P001-2023",
      description: "This is a test production",
      startDate: "2021-09-01",
      endDate: "2021-09-30",
      status: "Completed",
      teaType: "Black Tea",
      batchNumber: "B001",
    };

    try {
      const createdProduction = await Production.create(production);
      expect(createdProduction).toHaveProperty("ProdutionID", "P001-2023");
    } catch (error) {
      expect(error.status).toBe(400);
    }
  });
});

describe("getSingleProduction", () => {
  it("should return a single Production by id", async () => {
    const testProduction = await Production.findOne({ ProdutionID: "P001-2023" });
    const testProductionID = testProduction._id;

    const production = await Production.findById(testProductionID);
    expect(production).toHaveProperty("ProdutionID", "P001-2023");
  });

  it("should return 404 if payroll is not found", async () => {
    const payroll = await Production.findById("6451c5a0bf23f742e7e1f5de");
    expect(payroll).toBeNull();
  });
});

describe("updateProduction", () => {
  it("should update a Production", async () => {
    const production = {
      ProdutionID: "P001-2023",
      description: "This is a test production and now it updated", //updated
      startDate: "2021-09-01",
      endDate: "2021-09-30",
      status: "Completed",
      teaType: "Green Tea", //updated
      batchNumber: "B001",
    };
    const testProduction = await Production.findOne({ ProdutionID: "P001-2023" });
    const testProductionID = testProduction._id;

    const updatedProduction = await Production.findByIdAndUpdate(testProductionID, production, {
      new: true,
    });
    expect(updatedProduction).toHaveProperty("teaType", "Green Tea");
  });
});

describe("deleteProduction", () => {
  it("should delete a Production", async () => {
    const testProduction = await Production.findOne({ ProdutionID: "P001-2023" });
    const testProductionID = testProduction._id;

    const deletedProduction = await Production.findByIdAndDelete(testProductionID);
    expect(deletedProduction).toBeTruthy();
  });

  it("should return 404 if payroll is not found", async () => {
    const deletedEmploye = await Production.findByIdAndDelete("6451c5a0bf23f742e7e1f5de");
    expect(deletedEmploye).toBeNull();
  });
});
