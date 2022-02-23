"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceRequestSchema = void 0;
var celebrate_1 = require("celebrate");
exports.ServiceRequestSchema = {
    serviceAdd: {
        body: celebrate_1.Joi.object({
            ServiceId: celebrate_1.Joi.number(),
            ServiceStartDate: celebrate_1.Joi.date()
                .greater(Date.now())
                .required(),
            ServiceStartTime: celebrate_1.Joi.string().required(),
            ServiceHours: celebrate_1.Joi.number().required(),
            ExtraHours: celebrate_1.Joi.number(),
            Comments: celebrate_1.Joi.string(),
            HasPets: celebrate_1.Joi.boolean().required(),
            ServiceRequestAddress: celebrate_1.Joi.object().keys({
                AddressLine1: celebrate_1.Joi.string().required(),
                AddressLine2: celebrate_1.Joi.string(),
                City: celebrate_1.Joi.string().required(),
                State: celebrate_1.Joi.string(),
                PostalCode: celebrate_1.Joi.string().required(),
                Mobile: celebrate_1.Joi.number().integer().required().min(10).max(10),
            }),
            ExtraService: celebrate_1.Joi.object().keys({
                ServiceExtraId: celebrate_1.Joi.number()
            })
        })
    }
};
