import { hash as _hash } from 'bcrypt';
import { SERVER_ERROR } from '../../util/errors';

export default function encryptPassword(req, res, next){
    const password = req.body.password;
    if(password){
        _hash(password, 10).then(hash=>{
            req.body.password = hash;
            next();
        }).catch(err=>{
            res.locals.error =  {
                type: SERVER_ERROR,
                msg: 'Internal Server Error'
            };
        });
    }else{
        next();
    }
    
}