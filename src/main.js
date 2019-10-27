// Load environment variable from .env file
import dotenv from 'dotenv';
dotenv.config();

import path from "path";
import mongoAdapter from './dbAdapter/mongoAdapter';
import app from './app';

const dbUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
const dbName = process.env.MONGO_DB_NAME || 'test';
const port = process.env.PORT || 5000;
const secret = process.env.SECRET || 'secret';

const dbAdapter = mongoAdapter(dbUrl, dbName);

async function main(){
    await dbAdapter.connect()
    app(port, secret, dbAdapter, path.join(__dirname,'../public'));
}

main();