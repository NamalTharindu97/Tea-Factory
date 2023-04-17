//@desc GET all Employee
//@Route GET /api/v1/tea-factory/employees
//@access public
const getEmployee = (req, res) => {
  res.status(200).json({ message: "get all employee" });
};

//@desc GET Single Employee
//@Route GET /api/v1/tea-factory/employees/:id
//@access public
const getSingleEmployee = (req, res) => {
  res
    .status(200)
    .json({ message: `get employee details employee :  ${req.params.id}` });
};

//@desc POST create new Employee
//@Route POST /api/v1/tea-factory/employees
//@access public
const createEmployee = (req, res) => {
  const { name, email, phone, gender, age, role } = req.body;
  if (!name || !email || !phone || !gender || !age || !role) {
    res.status(400);
    throw new Error("all fields are mandotory");
  }
  console.log(req.body);
  res.status(200).json({ message: "create employee" });
};

//@desc PUT update employee
//@Route GET /api/v1/tea-factory/employees:id
//@access public
const updateEmployee = (req, res) => {
  res.status(200).json({ message: `update employee : ${req.params.id}` });
};

//@desc DELETE  Employee
//@Route DELETE /api/v1/tea-factory/employees:id
//@access public
const deleteEmployee = (req, res) => {
  res.status(200).json({ message: `employee deleted : ${req.params.id}` });
};

module.exports = {
  getEmployee,
  getSingleEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
