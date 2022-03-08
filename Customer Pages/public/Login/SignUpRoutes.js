"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var Login_Repository_1 = require("./Login.Repository");
var Login_Service_1 = require("./Login.Service");
var Login_Controller_1 = require("./Login.Controller");
var SignUprouter = express_1.default.Router();
var repo = new Login_Repository_1.loginRepository();
var service = new Login_Service_1.loginService(repo);
var controller = new Login_Controller_1.loginController(service);
/**
 * @swagger
 * definitions:
 *  CreateAnAccount:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: First name of customer
 *     example: 'Shreya'
 *    LastName:
 *     type: string
 *     description: Last name of customer
 *     example: 'Patel'
 *    Password:
 *     type: string
 *     description: Password of customer
 *     example: 'Tatva@123'
 *    ConfirmPassword:
 *     type: string
 *     description: Confirmed Password of customer
 *     example: 'Tatva@123'
 *    Mobile:
 *     type: string
 *     description: Mobile number of customer
 *     example: '9988001135'
 *    Email:
 *     type: string
 *     description: Email of customer
 *     example: 'shreyakm00@gmail.com'
 */
/**
 * @swagger
 * /Login/CreateAnAccount:
 *   post:
 *    summary: creact customer
 *    description: create customer
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/CreateAnAccount'
 *    responses:
 *     200:
 *      description: customer created successfully
 *     500:
 *      description: failure in creating customer
 */
SignUprouter.post('/CreateAnAccount', controller.createCustomer);
/**
 * @swagger
 * definitions:
 *  RegisterServiceProvider:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: First name of service provider
 *     example: 'Ram'
 *    LastName:
 *     type: string
 *     description: Last name of service provider
 *     example: 'Dinkar'
 *    Email:
 *     type: string
 *     description: Email of service provider
 *     example: 'rd20@gmail.com'
 *    Password:
 *     type: string
 *     description: Password of service provider
 *     example: 'rd2030'
 *    ConfirmPassword:
 *     type: string
 *     description: Confirmed Password of service provider
 *     example: 'rd2030'
 *    Mobile:
 *     type: string
 *     description: Mobile number of service provider
 *     example: '9898077484'
 */
/**
 * @swagger
 * /Login/BecomeHelper:
 *   post:
 *    summary: creact service provider
 *    description: create service provider
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/RegisterServiceProvider'
 *    responses:
 *     200:
 *      description: service provider created successfully
 *     500:
 *      description: failure in creating service provider
 */
SignUprouter.post('/BecomeHelper', controller.createServiceProvider);
module.exports = SignUprouter;
