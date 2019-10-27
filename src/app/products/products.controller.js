import Joi from 'joi';
import * as service from './products.service';
import * as schemas from './schemas';
import { BAD_REQUEST, NOT_FOUND, SERVER_ERROR } from '../util/errors';

const getAll = (req, res, next) => {
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

const create = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const data = req.body;
    const query = req.query;

    Joi.validate(data, schemas.create)
        .then(()=>{
            service.create(dbAdapter, data, query)
                .then(result =>{
                    if(result){
                        res.locals.status = 201;
                        res.locals.data = result;
                    }else{
                        res.locals.error =  {
                            type: SERVER_ERROR,
                            msg: 'Internal Server Error'
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

const get = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const id = req.params.id;
    const query = req.query;

    service.get(dbAdapter, id, query)
        .then(result =>{
            if(result){
                res.locals.status = 200;
                res.locals.data = result;
            }else{
                res.locals.error =  {
                    type: NOT_FOUND,
                    msg: 'The product is not found'
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
}

const replace = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const data = req.body;
    const id = req.params.id;
    const query = req.query;

    Joi.validate(data, schemas.replace)
        .then(()=>{
            service.replace(dbAdapter, id, data, query)
                .then(result =>{
                    if(result){
                        res.locals.status = 200;
                        res.locals.data = result;
                    }else{
                        res.locals.error =  {
                            type: NOT_FOUND,
                            msg: 'The product is not found'
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

const update = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const data = req.body;
    const id = req.params.id;
    const query = req.query;

    Joi.validate(data, schemas.replace)
        .then(()=>{
            service.update(dbAdapter, id, data, query)
                .then(result =>{
                    if(result){
                        res.locals.status = 200;
                        res.locals.data = result;
                    }else{
                        res.locals.error =  {
                            type: NOT_FOUND,
                            msg: 'the product is not found'
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

const remove = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();
        
    const dbAdapter = res.locals.dbAdapter;
    const id = req.params.id;
    const query = req.query;

    service.remove(dbAdapter, id, query)
        .then(result =>{
            if(result){
                res.locals.status = 200;
                res.locals.data = result;
            }else{
                res.locals.error =  {
                    type: NOT_FOUND,
                    msg: 'The product is not found'
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
}

export {
    create,
    update,
    replace,
    remove,
    get,
    getAll
};
