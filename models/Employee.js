const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  idUser: { type: mongoose.Schema.Types.ObjectId ,require: true }, 
  names: { type: String, required: true },  
  identification: { type: String, required: true, unique: true },  
}, { timestamps: true,_id: true });  

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;
