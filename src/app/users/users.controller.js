import { validate } from 'joi';
import * as service from './users.service';
import * as schemas from './schemas';
import { BAD_REQUEST, SERVER_ERROR } from '../util/errors';

export const getAll = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const query = req.query;

    service.getAll(dbAdapter,query)
        .then(result =>{
            res.locals.status = 200;
            res.locals.data = result;
            next();
        }).catch(err => {
            res.locals.error =  {
                type: SERVER_ERROR,
                msg: 'Internal Server Error'
            };
            next()
        });
}

export const create = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const data = req.body;
    const query = req.query;

    validate(data, schemas.create)
        .then(()=>{
            service.create(dbAdapter, data, query)
                .then(result =>{
                    if(result){
                        res.locals.status = 201;
                        res.locals.data = result;
                    }else{
                        res.locals.error =  {
                            type: BAD_REQUEST,
                            msg: 'username already exists, please choose an other one'
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
