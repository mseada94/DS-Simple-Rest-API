const bcrypt = require('bcrypt');

module.exports = function encryptPassword(req, res, next){
    const password = req.body.password;
    if(password){
        bcrypt.hash(password, 10).then(hash=>{
            req.body.password = hash;
            next();
        });
    }else{
        next();
    }
    
}