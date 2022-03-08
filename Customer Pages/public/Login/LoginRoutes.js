"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var Login_Repository_1 = require("./Login.Repository");
var Login_Service_1 = require("./Login.Service");
var Login_Controller_1 = require("./Login.Controller");
var celebrate_1 = require("celebrate");
var Users_model_1 = require("../Users/Users.model");
var login = Users_model_1.UserSchema.login;
var Loginrouter = express_1.default.Router();
var repo = new Login_Repository_1.loginRepository();
var service = new Login_Service_1.loginService(repo);
var controller = new Login_Controller_1.loginController(service);
/**
 * @swagger
 * definitions:
 *  Login:
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'shreyakm00@gmail.com'
 *    Password:
 *     type: string
 *     description: Password of user
 *     example: 'tatva@123'
 */
/**
 * @swagger
 * /login:
 *   post:
 *    summary: login
 *    description: login
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Login'
 *    responses:
 *     200:
 *      description: user logged in successfully
 *     500:
 *      description: failure in login
 */
Loginrouter.post('/', (0, celebrate_1.celebrate)(login), controller.login);
Loginrouter.delete('/logout', controller.logout);
module.exports = Loginrouter;
