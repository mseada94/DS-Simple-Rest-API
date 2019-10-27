import Joi from 'joi';
import * as service from './auth.service';
import * as  schemas from './schemas';
import { BAD_REQUEST, UNAUTHORIZED, SERVER_ERROR } from '../util/errors';

const login = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const secret = res.locals.secret;
    const data = req.body;

    Joi.validate(data, schemas.login)
        .then(()=>{
            service.login(dbAdapter, data, secret)
                .then(result =>{
                    if(result){
                        res.locals.status = 200;
                        res.locals.data = result;
                    }else{
                        res.locals.error =  {
                            type: UNAUTHORIZED,
                            msg: 'Invalid username and password!'
                        };
                    }
                    next();
                }).catch(err => {
                    res.locals.error =  {
                        type: SERVER_ERROR,
                        msg: 'Internal Server Error'
                    };
                    next()
                });
        })
        .catch(err => {
            res.locals.error =  {
                type: BAD_REQUEST,
                msg: 'Invalid Body Formate'
            };
            next()
        });
}


export  {
    login
};
