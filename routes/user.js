const express = require('express');
const router = express.Router();
const userRepository = require('../repositories/UserRepository');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/authMiddleware');
const { validationResult } = require('express-validator');
const validateParams = require('../middleware/validateMiddleware');


// considerar cambiar verifytoken
router.get("/",verifyToken, async (req, res) => {
    try {
        const user = await userRepository.getAllUsers();
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener user" });
    }
});


router.post("/register", validateParams, async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const newUser = await userRepository.createUser(req.body);
        res.status(201).json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al agregar el usuario: " + error.message });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await userRepository.login({username, password});

    if (!user) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
    } else {
        const token = jwt.sign(
            { userId: user._id, username: user.username },
            process.env.API_SECRET, 
            { expiresIn: '1h' }
          );

        
          res.status(200).json({
            idRol: user.idRol,
            email: user.email,
            username: user.username, 
            token: token
          });
    }

});

module.exports = router;
