const request = require("supertest");
const app = require("../../backend/server"); // Import the app from server.js
const Employe = require("../models/employeeModel");

describe("Employee API", () => {
  let employeeId;

  beforeAll(async () => {
    // Create a test employee for each test case
    const employee = new Employe({
      name: "Test Employee",
      email: "test@example.com",
      phone: "1234567890",
      gender: "male",
      age: 25,
      role: "employee",
      password: "test123",
      img: "https://example.com/test.png",
    });
    await employee.save();
    employeeId = employee._id;
  });

  afterAll(async () => {
    // Clean up the test employee after each test case
    // await Employe.deleteMany();
  });

  test("Always true test case", () => {
    expect(true).toBe(true);
  });

  test("GET /api/v1/tea-factory/employees/:id should return a single employee", async () => {
    const response = await request(app).get(`/api/v1/tea-factory/employees/${employeeId}`);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Test Employee");
  });

  test("GET /api/v1/tea-factory/employees should return all employees", async () => {
    const response = await request(app).get("/api/v1/tea-factory/employees");
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
  }, 10000);

  test("POST /api/v1/tea-factory/employees should create a new employee", async () => {
    const newEmployee = {
      name: "TestUser",
      email: "new@example.com",
      phone: "9876543210",
      gender: "female",
      age: 30,
      role: "manager",
      password: "new123",
      img: "https://example.com/new.png",
    };

    const response = await request(app).post("/api/v1/tea-factory/employees").send(newEmployee);

    expect(response.status).toBe(201);
    expect(response.body.name).toBe("TestUser");

    // Verify that the employee is created in the database
    const employee = await Employe.findById(response.body._id);
    expect(employee).toBeTruthy();
  });

  test("PUT /api/v1/tea-factory/employees/:id should update an employee", async () => {
    const updatedEmployee = {
      name: "Updated Employee",
      email: "updated@example.com",
      phone: "9999999999",
    };

    const response = await request(app).put(`/api/v1/tea-factory/employees/${employeeId}`).send(updatedEmployee);

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("Updated Employee");

    // Verify that the employee is updated in the database
    const employee = await Employe.findById(employeeId);
    expect(employee.name).toBe("Updated Employee");
  });

  test("DELETE /api/v1/tea-factory/employees/:id should delete an employee", async () => {
    const response = await request(app).delete(`/api/v1/tea-factory/employees/${employeeId}`);
    expect(response.status).toBe(200);

    // Verify that the employee is deleted from the database
    const employee = await Employe.findById(employeeId);
    expect(employee).toBeFalsy();
  });
});

test("Always true test case", () => {
  expect(true).toBe(true);
});
