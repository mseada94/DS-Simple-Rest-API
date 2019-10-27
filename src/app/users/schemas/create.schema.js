import Joi from 'joi';

const createSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().required(),
    role: Joi.string().required()
});

export default createSchema;