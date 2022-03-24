import { Joi } from "celebrate";

export const SettingsSchema = {
    detailsAdd: {
        body: Joi.object({
            FirstName: Joi.string(),
            LastName: Joi.string(),
            Email: Joi.string().email(),
            Mobile: Joi.string().min(10).max(10),
            DOB: Joi.date().max(Date.now()),
            NationalityId: Joi.string(),
            Gender:Joi.string(),
            UserProfilePicture:Joi.string(),
        })
    },

    addressAdd: {
        body: Joi.object({
            StreetName: Joi.string()
                             .required()
                             .example('abc')
                             .description('address line 1 of user address'),
            HouseName: Joi.string()
                             .example('abc')
                             .description('address line 2 of user address'),
            City: Joi.string()
                     .required()
                     .example('Ahmedabad')
                     .description('City of user address'),
            PostalCode: Joi.string().required(),
            
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