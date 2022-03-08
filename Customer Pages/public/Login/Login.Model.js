"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LogInSchema = void 0;
var celebrate_1 = require("celebrate");
exports.LogInSchema = {
    loginAdd: {
        body: celebrate_1.Joi.object({
            Email: celebrate_1.Joi.string()
                .required()
                .email()
                .example('solankiparita7@gmail.com')
                .description('Email of the user'),
            Password: celebrate_1.Joi.string()
                .required()
                .example('pari123')
                .description('Password of the user'),
        })
    }
};
