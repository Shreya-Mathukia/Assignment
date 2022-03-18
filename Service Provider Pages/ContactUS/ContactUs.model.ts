import { Joi } from 'celebrate';

const params: object = {
    id: Joi.number()
        .integer()
        .required()
        .description('Id of User')
};

export const ContactUsSchema = {
    get: {
        params: params
    },
    add: {
        body: Joi.object({
            FirstName: Joi.string().required(),
            LastName: Joi.string().required(),
            Email: Joi.string().email().required(),
            Subject:Joi.string().required(),
            Message:Joi.string().required(),
            Mobile:Joi.string().required().max(10).min(10),
            UploadFileName: Joi.string().required(),
            
            
            })
    }
    
};
