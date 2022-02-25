import {Joi} from "celebrate"

export const ResetPasswordSchema = {
    reset: {
            body: Joi.object({
                Password:Joi.string().min(6).max(15).required(),
                ConfirmPassword: Joi.any().valid(Joi.ref('Password')).required()
    })
},

forgot: {
    body: Joi.object({
        Email: Joi.string().email().required(),
        
})
}
}