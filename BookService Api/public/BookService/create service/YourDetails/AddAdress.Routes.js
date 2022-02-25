"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var AddAddress_Controller_1 = require("./AddAddress.Controller");
var AddAddress_Repository_1 = require("./AddAddress.Repository");
var AddAdress_Service_1 = require("./AddAdress.Service");
var AddAddress_Model_1 = require("./AddAddress.Model");
var Login_Repository_1 = require("../../../Login/Login.Repository");
var Login_Service_1 = require("../../../Login/Login.Service");
var Login_Controller_1 = require("../../../Login/Login.Controller");
var addressAdd = AddAddress_Model_1.ServiceAddressSchema.addressAdd;
var YourDetailRouter = express_1.default.Router();
var repo1 = new Login_Repository_1.loginRepository();
var service1 = new Login_Service_1.loginService(repo1);
var LoginController = new Login_Controller_1.loginController(service1);
var repo = new AddAddress_Repository_1.ServiceAddressRepository();
var service = new AddAdress_Service_1.ServiceAddressService(repo);
var controller = new AddAddress_Controller_1.ServiceAddressController(service);
/**
 * @swagger
 * definitions:
 *  YourDetails:
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
 * /YourDetails:
 *   post:
 *    summary: Service Address
 *    description: Add Service Address
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/YourDetails'
 *    responses:
 *     200:
 *      description: Book Service Successful, Notified Service Provider Near you.
 *     500:
 *      description: Error
 *     400:
 *      description: Authentication Error.
 */
YourDetailRouter.post('/YourDetails', LoginController.validateToken, controller.CreateServiceAddress);
module.exports = YourDetailRouter;
