import { Joi } from "celebrate";

export const ServiceRequestSchema = {
    serviceupdate: {
        body: Joi.object({

            ServiceStartDate: Joi.date()
            .greater(Date.now())
            .required(),
            
            ServiceStartTime: Joi.string().required()                      
        })     
    }
    
}
