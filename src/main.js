import { mongoUrl, dbName, rethinkHost, rethinkPort } from "./config";
import mongoAdapter from './dbAdapter/mongoAdapter';
import rethinkAdapter from './dbAdapter/rethinkAdapter';
import app from './app';

//const dbAdapter = mongoAdapter(mongoUrl, dbName);
const dbAdapter = rethinkAdapter(rethinkHost, rethinkPort, dbName);

async function main(){
    await dbAdapter.connect()
    app(dbAdapter);
}

main();