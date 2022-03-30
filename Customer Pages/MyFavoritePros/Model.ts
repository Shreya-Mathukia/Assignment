import { Joi } from "celebrate";

export const FavSchema = {
    favAdd: {
        body: Joi.object({
            IsFavorite: Joi.boolean().required()
        })
    },

    blockAdd: {
        body: Joi.object({
            IsBlocked: Joi.boolean().required()
        })
    },
}
