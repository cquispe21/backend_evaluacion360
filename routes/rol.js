const express = require('express');
const router = express.Router();
const Rol = require('../models/Rol'); 




router.get("/", async (req, res) => {
  try {
    const roles = await Rol.find(); 
    res.status(200).json(roles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener roles" });
  }
});

module.exports = router;
