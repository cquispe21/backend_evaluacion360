const mongoose = require('mongoose');

const rolSchema = new mongoose.Schema({
  idRol: { type: Number, required: true },
  descripcion: { type: String, required: true }
},{_id: false});

const Rol = mongoose.model('Rol', rolSchema, 'rol');

module.exports = Rol;