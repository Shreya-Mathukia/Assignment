"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var address_repository_1 = require("./address.repository");
var address_model_1 = require("./address.model");
var address_service_1 = require("./address.service");
var address_controller_1 = require("./address.controller");
var Login_Repository_1 = require("../../Login/Login.Repository");
var Login_Service_1 = require("../../Login/Login.Service");
var Login_Controller_1 = require("../../Login/Login.Controller");
var addressAdd = address_model_1.UserAddressSchema.addressAdd;
var userAddressRouter = express_1.default.Router();
var repo1 = new Login_Repository_1.loginRepository();
var service1 = new Login_Service_1.loginService(repo1);
var LoginController = new Login_Controller_1.loginController(service1);
var repo = new address_repository_1.UserAddressRepository();
var service = new address_service_1.UserAddressService(repo);
var controller = new address_controller_1.UserAddressController(service);

/**
 * @swagger
 * definitions:
 *  CreateUserAddress:
 *   type: object
 *   properties:
 *    AddressLine1:
 *     type: string
 *     description: Street Name
 *     example: 'Ram Park Colony'
 *    AddressLine2:
 *     type: string
 *     description: House Number
 *     example: '401 Heet Palace'
 *    City:
 *     type: string
 *     description: City 
 *     example: 'Rajkot'
 *    State:
 *     type: string
 *     description: State
 *     example: 'Gujarat'
 *    Mobile:
 *     type: string
 *     description: Mobile number of service provider
 *     example: '9898077484'
 */

/**
 * @swagger
 * /CreateUserAddress:
 *   post:
 *    summary: Create User Address
 *    description: Create User Address
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/CreateUserAddress'
 *    responses:
 *     200:
 *      description: Youe Address added.
 *     500:
 *      description: Error
 *     400:
 *      description: Authentication Error.
 */

userAddressRouter.post('/CreateUserAddress', (0, celebrate_1.celebrate)(addressAdd), LoginController.validateToken, controller.CreateUserAddress);

/**
 * @swagger
 * /getUserAddresses:
 *  get:
 *   summary: get all address of logged in user.
 *   description: get all address of logged in user.
 *   responses:
 *    200:
 *     description: List of Addresses.
 *    500:
 *     description: error
 */



userAddressRouter.get('/getUserAddresses', LoginController.validateToken, controller.getAddresses);
module.exports = userAddressRouter;
