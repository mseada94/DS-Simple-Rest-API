import Joi from 'joi';

const replaceSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30).required(),
    description: Joi.string(),
    img: Joi.string().uri().required(),
    //owner: Joi.string().required(),
    //quantity: Joi.number().integer().min(0).required(),
    price: Joi.number().min(0).required(),
    //discount: Joi.number().min(0).max(99).required(),
    spec: Joi.object()
});

export default replaceSchema;