const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req,res,next) => {
    try{
        const token = req.headers.authorization.split(' ')[1],
            decodedToken = jwt.verify(token, process.env.JWT_SECURE_KEY),
            userId = decodedToken.userId;
        if(req.body.userId){
            if(req.body.userId !== userId) {
                throw 'Invalid user ID';
            } else {
                next();
            }
        } else {
            throw 'No user ID';
        }
    } catch {
        res.status(401).json({
            error: new Error('Invalid request!').message
        });
    }
};