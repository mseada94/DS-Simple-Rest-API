const Joi = require('joi');

const replaceSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string(),
    seller: Joi.string().required(),
    quantity: Joi.number().integer().min(0).required(),
    price: Joi.number().min(0).required(),
    discount: Joi.number().min(0).max(99).required(),
    spec: Joi.object()
});

module.exports = replaceSchema;