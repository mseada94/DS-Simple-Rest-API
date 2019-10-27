import Joi from 'joi';

const loginSchema = Joi.object().keys({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(8).max(30).required()
});

export default loginSchema;