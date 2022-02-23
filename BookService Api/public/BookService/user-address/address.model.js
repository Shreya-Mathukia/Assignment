"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAddressSchema = void 0;
var celebrate_1 = require("celebrate");
exports.UserAddressSchema = {
    addressAdd: {
        body: celebrate_1.Joi.object({
            AddressLine1: celebrate_1.Joi.string()
                .required()
                .example('abc')
                .description('address line 1 of user address'),
            AddressLine2: celebrate_1.Joi.string()
                .example('abc')
                .description('address line 2 of user address'),
            City: celebrate_1.Joi.string()
                .required()
                .example('Ahmedabad')
                .description('City of user address'),
            State: celebrate_1.Joi.string()
                .example('Gujarat')
                .description('State of user address'),
            Mobile: celebrate_1.Joi.string()
                .required()
                .min(10).max(10)
                .example('9988776655')
                .description('Mobile number of the user'),
        })
    }
};
