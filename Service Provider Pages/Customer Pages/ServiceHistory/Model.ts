import { Joi } from "celebrate";

export const HistorySchema = {
    ratingAdd: {
        body: Joi.object({
            OnTimeArrival: Joi.number().min(0).max(5).required(),
            Friendly: Joi.number().min(0).max(5).required(),
            QualityOfService: Joi.number().min(0).max(5).required(),
            Comments: Joi.string(),
        })
    }

}
