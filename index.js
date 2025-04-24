const express = require('express');
const mongoose = require('mongoose');
const rolRoutes = require('./routes/rol');
const userRoutes = require('./routes/user');
const evaluationRoutes = require('./routes/evaluation');
const employeesRoutes = require("./routes/employee");
const emailRoutes = require("./routes/email");
var cors = require('cors')


const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(cors())
app.use(express.json());

const PORT = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('Conectado a MongoDB');
    })
    .catch((err) => {
        console.error('Error al conectar a MongoDB:', err);
    });



app.use('/api/rol', rolRoutes);
app.use('/api/auth', userRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/employees',employeesRoutes);
app.use('/api/email', emailRoutes);


app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});



