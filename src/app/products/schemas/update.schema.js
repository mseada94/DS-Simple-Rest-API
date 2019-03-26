const Joi = require('joi');

const updateSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30),
    description: Joi.string(),
    quantity: Joi.number().integer().min(0),
    discount: Joi.number().min(0).max(99),
    spec: Joi.object()
});

module.exports = updateSchema;