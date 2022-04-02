import {Joi} from "celebrate"

const header:Object = {
    authorization:  Joi.string()
                    .required()
};



export const UserManagementSchema = {
    RefundAmount: {
        body: Joi.object({
            PaidAmount:Joi.number()
                        .required()
                        .example('4')
                        .description('amount'),
            RefundedAmount:Joi.number()
                        .required()
                        .example('4')
                        .description('amount'),
            Comment:Joi.string()
                        .example('comments')
                        .description('Comments'),
            Notes:Joi.string()
                        .example('notes')
                        .description('Notes'),
            
                        
        })
    },

}
