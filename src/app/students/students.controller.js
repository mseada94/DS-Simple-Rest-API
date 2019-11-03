import * as service from './students.service';
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
                    msg: 'The student is not found'
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

    service.replace(dbAdapter, id, data, query)
        .then(result =>{
            if(result){
                res.locals.status = 200;
                res.locals.data = result;
            }else{
                res.locals.error =  {
                    type: NOT_FOUND,
                    msg: 'The student is not found'
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

const update = (req, res, next) => {
    // Skip if error
    if(res.locals.error) 
        return next();

    const dbAdapter = res.locals.dbAdapter;
    const data = req.body;
    const id = req.params.id;
    const query = req.query;

    service.update(dbAdapter, id, data, query)
        .then(result =>{
            if(result){
                res.locals.status = 200;
                res.locals.data = result;
            }else{
                res.locals.error =  {
                    type: NOT_FOUND,
                    msg: 'the student is not found'
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
                    msg: 'The student is not found'
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
