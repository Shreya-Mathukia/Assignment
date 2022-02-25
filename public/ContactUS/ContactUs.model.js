"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactUsSchema = void 0;
var celebrate_1 = require("celebrate");
var params = {
    id: celebrate_1.Joi.number()
        .integer()
        .required()
        .description('Id of User')
};
exports.ContactUsSchema = {
    get: {
        params: params
    },
    add: {
        body: celebrate_1.Joi.object({
            FirstName: celebrate_1.Joi.string().required(),
            LastName: celebrate_1.Joi.string().required(),
            Email: celebrate_1.Joi.string().email().required(),
            Subject: celebrate_1.Joi.string().required(),
            Message: celebrate_1.Joi.string().required(),
            Mobile: celebrate_1.Joi.string().required().max(10).min(10),
            UploadFileName: celebrate_1.Joi.string().required(),
        })
    }
};
