const express = require('express');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');

const products = require('./products');
//const orders = require('./orders');

const responseFormater = require('./util/response.Formater');

module.exports =  function app(port, dbAdapter, publicDir) {
    const server = express();

    // Host the public folder if configured
    if(publicDir){
        // Host the public folder
        server.use('/', express.static(publicDir));
    }
    
    // Enable security, CORS, compression, favicon and body parsing
    server.use(helmet());
    server.use(cors());
    server.use(compress());
    server.use(express.json());
    server.use(express.urlencoded({ extended: true }));

    server.use((req,res,next)=>{
        res.locals.dbAdapter = dbAdapter;
        next();
    })
    
    // Expose Routes for app components
    const root = express.Router();
    root.use(products);
    //root.use(orders);
    server.use('/api', root);

    // MiddleWares
    server.use(responseFormater);

    server.listen(port || 5000);
}
