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
/**
 * @swagger
 * definitions:
 *  ForgotPassword: 
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'shreyakm00@gmail.com'
 */

/**
 * @swagger
 * /ForgotPassword:
 *   post:
 *    summary: ForgotPassword
 *    description: ForgotPassword
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ForgotPassword'
 *    responses:
 *     200:
 *      description: Check your mail
 *     500:
 *      description: Invalid mail, Try agian or creating an account first.
 */
ForgotPasswordrouter.post('/ForgotPassword', controller.ForgotPassword);
/**
 * @swagger
 * definitions:
 *  ResetPassword: 
 *   type: object
 *   properties:
 *    Password:
 *     type: string
 *     description: Password
 *     example: 'shreyakm0012345'
 *    ConfirmPassword:
 *     type: string
 *     description:  Reenter Password for confirmatio
 *     example: 'shreyakm0012345'
 */

/**
 * @swagger
 * /ResetPassword:
 *   post:
 *    summary: ResetPassword
 *    description: ResetPassword
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ResetPassword'
 *    responses:
 *     200:
 *      description: Password Reset
 *     500:
 *      description: Password Updation failed
 */

ForgotPasswordrouter.post('/ResetPassword', controller.ResetPassword);
module.exports = ForgotPasswordrouter;
