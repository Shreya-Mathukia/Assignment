"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestSchema = void 0;
var celebrate_1 = require("celebrate");
exports.ServiceRequestSchema = {
    serviceAdd: {
        body: celebrate_1.Joi.object({
            ServiceStartDate: celebrate_1.Joi.date()
                .greater(Date.now())
                .required(),
            ServiceStartTime: celebrate_1.Joi.string().required(),
            ServiceHours: celebrate_1.Joi.number().required(),
            ExtraService: celebrate_1.Joi.number(),
            Comments: celebrate_1.Joi.string(),
            HasPets: celebrate_1.Joi.boolean().required(),
        })
    }
};
