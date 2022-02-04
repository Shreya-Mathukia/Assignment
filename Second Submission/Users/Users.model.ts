import { Joi } from 'celebrate';

const params: object = {
    id: Joi.number()
        .integer()
        .required()
        .description('Id of User')
};

export const UserSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            FirstName: Joi.string().required(),
            LastName: Joi.string().required(),
            Email: Joi.string().email().required(),
            Password:Joi.string().min(6).max(15).required(),
            Mobile:Joi.string().required().max(10).min(10),
        })
    },
    login:{
        body: Joi.object({
        Email: Joi.string().email().required(),
         Password:Joi.string().min(6).max(15).required() })
    }
};
