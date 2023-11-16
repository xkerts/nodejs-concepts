const express = require("express");
const router = express.Router();
const data = {};
data.employees = require("../../data/employees.json");

router
  .route("/")
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    let employee = {};
    employee.id = req.body.id;
    employee.name = req.body.name;
    employee.age = req.body.age;
    data.employees.push(employee);
    res.json(data.employees);
  })
  .put((req, res) => {
    res.json({
      name: req.body.name,
      age: req.body.age,
    });
  })
  .delete((req, res) => {
    res.json({
      id: req.body.id,
    });
  });

router.route("/:id").get((req, res) => {
  res.json({ id: req.params.id });
});

module.exports = router;
