const jwt = require('jsonwebtoken');


function verifyToken(req, res, next) {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) return res.status(401).json({ error: 'No autorizado' });
    try {
        const decoded = jwt.verify(token, process.env.API_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        console.log("error",error)
        res.status(401).json({ error: 'Token inválido' });
    }
};

module.exports = verifyToken;