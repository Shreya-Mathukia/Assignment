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
    }
}