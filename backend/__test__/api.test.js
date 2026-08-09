const request = require("supertest");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = require("../server");

describe("API auth guard and routing", () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.CONNECTION_STRING);
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  it("should reject requests without a token with 401", async () => {
    const res = await request(app).get("/api/v1/tea-factory/employees");
    expect(res.status).toBe(401);
  });

  it("should reject requests with an invalid token with 401", async () => {
    const res = await request(app)
      .get("/api/v1/tea-factory/employees")
      .set("Authorization", "Bearer not-a-real-token");
    expect(res.status).toBe(401);
  });

  it("should allow login without a token (public route)", async () => {
    const res = await request(app).post("/api/v1/tea-factory/employees/login").send({});
    expect(res.status).toBe(400);
  });

  it("should accept requests with a valid token", async () => {
    const token = jwt.sign(
      { user: { name: "tester", role: "HR Manager", email: "tester@example.com" } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "60m" }
    );
    const res = await request(app)
      .get("/api/v1/tea-factory/employees")
      .set("Authorization", `Bearer ${token}`);
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should return 404 for unknown routes instead of hanging", async () => {
    const res = await request(app).get("/api/v1/tea-factory/does-not-exist");
    expect(res.status).toBe(404);
  });
});
