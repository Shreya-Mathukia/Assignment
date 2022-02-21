import { Joi } from "celebrate";

export const UserAddressSchema = {
    addressAdd: {
        body: Joi.object({
            AddressLine1: Joi.string()
                             .required()
                             .example('abc')
                             .description('address line 1 of user address'),
            AddressLine2: Joi.string()
                             .example('abc')
                             .description('address line 2 of user address'),
            City: Joi.string()
                     .required()
                     .example('Ahmedabad')
                     .description('City of user address'),
            State: Joi.string()
                      .example('Gujarat')
                      .description('State of user address'),
            Mobile: Joi.number()
                       .integer()
                       .required()
                       .min(10).max(10)
                       .example('9988776655')
                       .description('Mobile number of the user'),
        })
    }
};