# Simple Express Rest API

## Start App
### Install npm dependencies
```
npm install
```
### Create .env File in root directory
```
PORT=5001
MONGO_URL='mongodb://localhost:27017'
SECRET='ufEE8dWboqf2kr9j1cckIiFeX0xA0z3d5Raw3NqRC39Iw9JmoTk9ZSkohgVSKXu'

RETHINK_HOST='localhost'
RETHINK_PORT=28015

DB_NAME = 'test'
```

<hr>

## Install Express with common middleWares
```
npm i express compression cors helmet
```
## Install MongoDB Native Driver
```
npm i mongodb
```
## Install RethinkDB Native Driver
```
npm i rethinkdb
```
## Install Some Utils
```
npm i dotenv joi joi-objectid
```
## Install auth tools
```
npm install express-jwt jsonwebtoken bcrypt
```