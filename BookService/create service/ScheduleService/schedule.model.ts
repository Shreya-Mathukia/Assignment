import { Joi } from "celebrate";

export const ServiceRequestSchema = {
    serviceAdd: {
        body: Joi.object({

            ServiceStartDate: Joi.date()
            .greater(Date.now())
            .required(),
            
            ServiceStartTime: Joi.string().required(),

            ServiceHours: Joi.number().required(),
    
            ExtraService: Joi.number(),

            Comments: Joi.string(),

            HasPets: Joi.boolean().required(), 

                      
        })
       
    }
}
