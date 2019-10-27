import { dbUrl, dbName } from "./config";
import mongoAdapter from './dbAdapter/mongoAdapter';
import app from './app';

const dbAdapter = mongoAdapter(dbUrl, dbName);

async function main(){
    await dbAdapter.connect()
    app(dbAdapter);
}

main();