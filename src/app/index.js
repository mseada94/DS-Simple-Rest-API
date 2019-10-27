import express, { json, urlencoded, Router } from 'express';
import compress from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import jwt from 'express-jwt';

import { port, secret, publicPath } from "../config";

import products from './products';
import users from './users';
import auth from './auth';

import responseFormatter from './util/response.formatter';

export default  function app(dbAdapter) {
    const server = express();

    // Host the public folder if configured
    if(publicPath){
        // Host the public folder
        server.use('/', express.static(publicPath));
    }
    
    // Enable security, CORS, compression, favicon and body parsing
    server.use(helmet());
    server.use(cors());
    server.use(compress());
    server.use(json());
    server.use(urlencoded({ extended: true }));

    // Extract User information from Authorization header
    server.use(jwt({
        secret,
        credentialsRequired: false
      }));

    server.use((req,res,next)=>{
        res.locals.secret = secret;
        res.locals.dbAdapter = dbAdapter;
        next();
    })
    
    // Expose Routes for app components
    const root = Router();
    root.use(products);
    root.use(users);
    root.use(auth);
    
    server.use('/api', root);

    // MiddleWares
    server.use(responseFormatter);

    server.listen(port || 5000);
}
