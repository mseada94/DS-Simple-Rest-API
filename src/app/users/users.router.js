const express = require('express');
const controller = require('./users.controller');
const { hidePassword, encryptPassword } = require('./middlewares');
const { role } = require('../auth/middlewares');
const resource = '/users';

const router = express.Router();
const route = express.Router();

route.use(encryptPassword);

route.route('')
    .get(role('admin'), controller.getAll)
    .post(controller.create);

route.use(hidePassword);

router.use(resource, route);

module.exports =  router;
