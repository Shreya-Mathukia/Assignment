"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var ForgotPassword_Controller_1 = require("./ForgotPassword.Controller");
var ForgotPassword_Repository_1 = require("./ForgotPassword.Repository");
var ForgotPassword_Service_1 = require("./ForgotPassword.Service");
var ForgotPasswordrouter = express_1.default.Router();
var repo = new ForgotPassword_Repository_1.ForgotPasswordRepository();
var service = new ForgotPassword_Service_1.ForgotPasswordService(repo);
var controller = new ForgotPassword_Controller_1.ForgotPasswordController(service);
ForgotPasswordrouter.post('/ForgotPassword', controller.ForgotPassword);
ForgotPasswordrouter.post('/ResetPassword', controller.ResetPassword);
module.exports = ForgotPasswordrouter;
