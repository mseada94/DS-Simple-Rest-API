const express = require('express');
const controller = require('./products.controller');

const resource = '/products';
const router = express.Router();


router.route(resource)
    .get(controller.getAll)
    .post(controller.create);

router.route(resource + '/:id')
    .get(controller.get)
    .put(controller.replace)
    .patch(controller.update)
    .delete(controller.remove);

module.exports =  router;
