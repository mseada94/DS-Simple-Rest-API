import Joi from 'joi';

const updateSchema = Joi.object().keys({
    name: Joi.string().min(3).max(30),
    description: Joi.string(),
    img: Joi.string().uri(),
    //quantity: Joi.number().integer().min(0),
    //discount: Joi.number().min(0).max(99),
    price: Joi.number().min(0),
    spec: Joi.object()
});

export default updateSchema;