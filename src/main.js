// Load environment variable from .env file
require('dotenv').config();

const path = require('path');
const mongoAdapter = require('./dbAdapter/mongoAdapter');
const app = require('./app');

const dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'test';
const port = process.env.PORT || 5000;
const secret = process.env.SECRET || 'secret';

const dbAdapter = mongoAdapter(dbUrl, dbName);

//if(false)
dbAdapter.connect().then(async _ =>{
    app(port, secret, dbAdapter, path.join(__dirname,'../public'));
});

if(false)
dbAdapter.connect().then(async _ =>{
    let res;
    res = await dbAdapter.getAll('stores',3, 5);
    console.log(res);

    res = await dbAdapter.insert('stores', {name:'test'});
    console.log(res);

    res = await  dbAdapter.get('stores', res._id);
    console.log(res);
    
    res = await dbAdapter.update('stores', res._id, {name:'updated'});
    console.log(res);

    res = await dbAdapter.replace('stores', res._id, {title:'replaced'});
    console.log(res);

    res = await  dbAdapter.remove('stores', res._id);
    console.log(res);
    
    dbAdapter.close();
});
