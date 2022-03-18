import { Joi } from "celebrate";

export const SettingsSchema = {
    detailsAdd: {
        body: Joi.object({
            FirstName: Joi.string(),
            LastName: Joi.string(),
            Mobile: Joi.string().min(10).max(10),
            DOB: Joi.date().max(Date.now()),
            LanguageId: Joi.string(),
        })
    },

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
            PostalCode: Joi.string().required(),
            Mobile: Joi.string()
                       .required()
                       .min(10).max(10)
                       .example('9988776655')
                       .description('Mobile number of the user')
        })
    },

    passwordAdd: {
        body: Joi.object({
            OldPassword: Joi.string().min(6).max(15).required(),
            NewPassword: Joi.string().min(6).max(15).required(),
            ConfirmPassword: Joi.any().valid(Joi.ref('NewPassword')).required()
        })
    }

}