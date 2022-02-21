import { Joi } from "celebrate";

export const ServiceSchema = {
    zipAdd: {
        body: Joi.object({
            ZipCode: Joi.string()
                        .required()
                        .example(12345)
                        .description('ZipCode of the customer')
        })
    }   
};