const Employee = require("../models/employee");
const {
  throwError,
  errorMessage,
  setDefaultStatus,
} = require("../utils/error");

exports.getAllEmployee = async (req, res, next) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const employees = await Employee.find();
    if (!employees) {
      throw throwError(errorMessage.EmployeeNotFound);
    }
    res.status(200).json({
      message: "employees fetched",
      totalEmployees: totalEmployees,
      employees: employees,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.getEmployee = async (req, res, next) => {
  try {
    const { employeeId } = req.params;
    console.log("\x1b[35m", "👉👉👉 employeeId :", employeeId);
    const employee = await Employee.findById(employeeId);

    if (!employee) {
      throw throwError(errorMessage.EmployeeNotFound);
    }

    res.status(200).json({
      message: "employee found",
      employee: employee._doc,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    const employee = new Employee(req.body);

    await employee.validate();

    await employee.save();

    res.status(200).json({
      message: "employee created",
      employee: employee._id,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    const updateHelper = (data, dataField, employeeObj) => {
      if (data) {
        employeeObj[dataField] !== data && (employeeObj[dataField] = data);
      }
    };
    const { employeeId } = req.params;
    const { name, address, age, department, status } = req.body;

    const employee = await Employee.findById(employeeId);

    updateHelper(name, "name", employee);
    updateHelper(address, "address", employee);
    updateHelper(age, "age", employee);
    updateHelper(department, "department", employee);
    updateHelper(status, "status", employee);

    await employee.save();
    res.status(201).json({
      message: "update successful",
      employee: employee._doc,
    });
  } catch (err) {
    setDefaultStatus(err);
    next(err);
  }
};
