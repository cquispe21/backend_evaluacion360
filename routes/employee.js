const express = require('express');
const router = express.Router();
const EmployeeRepository = require('../repositories/EmployeeRepository'); 


router.get("/", async (req, res) => {
  try {
    const employees = await EmployeeRepository.getAllEmploye(); 
    res.status(200).json(employees);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener empleados" });
  }
});

module.exports = router;
