const Joi = require('joi');
const service = require('./products.service');
const schemas = require('./schemas');
const errors = require('../util/errors');

const getAll = (req, res, next) => {
    const dbAdapter = res.locals.dbAdapter;
    const query = req.query;

    service.getAll(dbAdapter,query)
        .then(result =>{
            res.locals.status = 200;
            res.locals.data = result;
            next();
        }).catch(err => {
            res.locals.error =  errors.SERVER_ERROR;
            next()
        });
}

const create = (req, res, next) => {
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
                        res.locals.error =  errors.NOT_FOUND;
                    }
                    next();
                }).catch(err => {
                    res.locals.error =  errors.SERVER_ERROR;
                    next()
                });
        })
        .catch(err => {
            res.locals.error =  errors.BAD_REQUEST;
            next()
        });
}

const get = (req, res, next) => {
    const dbAdapter = res.locals.dbAdapter;
    const id = req.params.id;
    const query = req.query;

    service.get(dbAdapter, id, query)
        .then(result =>{
            if(result){
                res.locals.status = 200;
                res.locals.data = result;
            }else{
                res.locals.error =  errors.NOT_FOUND;
            }
            next();
        }).catch(err => {
            res.locals.error =  errors.SERVER_ERROR;
            next()
        });
}

const replace = (req, res, next) => {
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
                        res.locals.error =  errors.NOT_FOUND;
                    }
                    next();
                }).catch(err => {
                    res.locals.error =  errors.SERVER_ERROR;
                    next()
                });
        })
        .catch(err => {
            res.locals.error =  errors.BAD_REQUEST;
            next()
        });
}

const update = (req, res, next) => {
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
                        res.locals.error =  errors.NOT_FOUND;
                    }
                    next();
                }).catch(err => {
                    res.locals.error =  errors.SERVER_ERROR;
                    next()
                });
        })
        .catch(err => {
            res.locals.error =  errors.BAD_REQUEST;
            next()
        });
}

const remove = (req, res, next) => {
    const dbAdapter = res.locals.dbAdapter;
    const id = req.params.id;
    const query = req.query;

    service.remove(dbAdapter, id, query)
        .then(result =>{
            if(result){
                res.locals.status = 200;
                res.locals.data = result;
            }else{
                res.locals.error =  errors.NOT_FOUND;
            }
            next();
        }).catch(err => {
            res.locals.error =  errors.SERVER_ERROR;
            next()
        });
}

module.exports =  {
    create,
    update,
    replace,
    remove,
    get,
    getAll
};
