// Load environment variable from .env file
import dotenv from 'dotenv';
dotenv.config();

import path from "path";

export const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost:27017';
export const rethinkHost = process.env.RETHINK_HOST || 'localhost';
export const rethinkPort = process.env.RETHINK_PORT || 28015;
export const dbName = process.env.DB_NAME || 'test';
export const port = process.env.PORT || 5000;
export const secret = process.env.SECRET || 'secret';
export const publicPath = path.join(__dirname,'../public')