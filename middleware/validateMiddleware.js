const { body } = require('express-validator');

const validateParams = [
  body('username')
    .isLength({ min: 5 })
    .withMessage('El nombre de usuario debe tener al menos 3 caracteres')
    .notEmpty()
    .withMessage('El nombre de usuario es obligatorio'),

  body('email')
    .isEmail()
    .withMessage('Debe ser un correo electrónico válido')
    .normalizeEmail(),


  body('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres')
    .matches(/\d/)
    .withMessage('La contraseña debe contener al menos un número'),


];

module.exports = validateParams;
