const uuid = require("uuid");
const data = {
  employees: require("../model/employees.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployees = (req, res) => {
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id == req.params.id);
  if (!employee) {
    return res.status(400).json({ message: `Employee with ID ${req.body.id} not found` });
  }
  res.json(employee);
};

const createNewEmployee = (req, res) => {
  let employee = {
    id: uuid.v4(),
    name: req.body.name,
    age: req.body.age,
  };
  if (!employee.name || !employee.age) {
    return res.status(400).json({ message: "Name and Age are required!" });
  }
  data.setEmployees([...data.employees, employee]);
  res.json(data.employees);
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id == req.body.id);
  if (!employee) {
    return res.status(400).json({ message: `Employee with ID ${req.body.id} not found` });
  }
  if (req.body.name) employee.name = req.body.name;
  if (req.body.age) employee.age = req.body.age;
  const filteredArray = data.employees.filter((emp) => emp.id !== req.body.id);
  const updatedArray = [...filteredArray, employee];
  data.setEmployees(updatedArray);
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find((emp) => emp.id == req.body.id);
  if (!employee) {
    return res.status(400).json({ message: `Employee with ID ${req.body.id} not found` });
  }

  const filteredArray = data.employees.filter((emp) => emp.id !== req.body.id);
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

module.exports = {
  getAllEmployees,
  getEmployee,
  createNewEmployee,
  updateEmployee,
  deleteEmployee,
};
