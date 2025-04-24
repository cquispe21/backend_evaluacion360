const User = require('../models/User');
const Employee = require('../models/Employee');
const bcrypt = require('bcrypt')

const createUser = async (userData) => {
    const { idRol, username, password, email, names, identification } = userData;

    const lastUser = await User.findOne().sort({ idUser: -1 }).exec();
    const existEmail = await User.findOne({email});
    
    if(existEmail){
        throw new Error("Ya existe registrado un usuario con el mismo correo")
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const newUser = new User({
        idRol,
        username,
        password: hashedPassword,
        email
    });

    const user = await newUser.save();

    const newEmployee = new Employee({
        idUser: user._id,
        names,
        identification
    })

    await newEmployee.save(); 

    return {
        "data": {},
        "error": false,
        "msgRetorno": "Usuario creado",
        "code": 200
      }
};


const getAllUsers = async () => {
    const users = await User.find();

    return {
        "data": users,
        "error": false,
        "msgRetorno": "",
        "code": 200
      }

};


const login = async ({ username, password }) => {
    const user = await User.findOne({ username });

    if (!user) {
        return null;
    }

    const isValid = await bcrypt.compare(password, user.password);

    if (!isValid) {
        throw new Error("Contraseña incorrecta");
    }

    return {
        "data": user,
        "error": false,
        "msgRetorno": "",
        "code": 200
      }

}

module.exports = {
    createUser,
    getAllUsers,
    login
};
