import {Joi} from "celebrate"

export const LogInSchema = {
    loginAdd: {
        body: Joi.object({
            Email: Joi.string()
                      .required()
                      .email()
                      .example('solankiparita7@gmail.com')
                      .description('Email of the user'),
            Password: Joi.string()
                         .required()
                         .example('pari123')
                         .description('Password of the user'),
        })
    },

    signupAdd: {
            body: Joi.object({
                FirstName: Joi.string().required(),
                LastName: Joi.string().required(),
                Email: Joi.string().email().required(),
                Password:Joi.string().min(6).max(15).required(),
                ConfirmPassword: Joi.any().valid(Joi.ref('Password')).required(),
                Mobile:Joi.string().required().max(10).min(10),
    })
}

}