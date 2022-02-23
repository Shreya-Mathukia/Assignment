"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceSchema = void 0;
var celebrate_1 = require("celebrate");
exports.ServiceSchema = {
    zipAdd: {
        body: celebrate_1.Joi.object({
            ZipCode: celebrate_1.Joi
                .required()
                .example(12345)
                .description('ZipCode of the customer')
        })
    }
};
