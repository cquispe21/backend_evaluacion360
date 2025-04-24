const Employee = require('../models/Employee');
const bcrypt = require('bcrypt')

const createEmployee = async (userData) => {
    const { idRol, username, password, email } = userData;

    const lastUser = await User.findOne().sort({ idUser: -1 }).exec();
    const newIdUser = lastUser ? lastUser.idUser + 1 : 1;

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new User({
        idUser: newIdUser,
        idRol,
        username,
        password: hashedPassword,
        email
    });

    await newUser.save();
    return {
        "data": {},
        "error": false,
        "msgRetorno": "Empleado creado",
        "code": 200
    };
};


const getAllEmploye = async () => {
    const employees = await Employee.find();

    return {
        "data": employees || {},
        "error": false,
        "msgRetorno": "",
        "code": 200
    }
};



module.exports = {
    createEmployee,
    getAllEmploye,
};
