const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
//   idUser: { type: Number, required: true, auto: true }, 
  idRol: { type: Number, ref: 'rol', required: true }, 
  username: { type: String, required: true, unique: true },  
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true }
}, { timestamps: true, _id: true });  

const User = mongoose.model('User', userSchema,"user");

module.exports = User;
