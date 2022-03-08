"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceAddressSchema = void 0;
var celebrate_1 = require("celebrate");
exports.ServiceAddressSchema = {
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
        })
    }
};
