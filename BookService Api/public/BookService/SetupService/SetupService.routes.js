"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var SetupService_repository_1 = require("./SetupService.repository");
var SetupService_models_1 = require("./SetupService.models");
var SetUpService_service_1 = require("./SetUpService.service");
var SetupService_controller_1 = require("./SetupService.controller");
var Login_Repository_1 = require("../../Login/Login.Repository");
var Login_Service_1 = require("../../Login/Login.Service");
var Login_Controller_1 = require("../../Login/Login.Controller");
var zipAdd = SetupService_models_1.ServiceSchema.zipAdd;
var SetupServiceRouter = express_1.default.Router();
var repo1 = new Login_Repository_1.loginRepository();
var service1 = new Login_Service_1.loginService(repo1);
var LoginController = new Login_Controller_1.loginController(service1);
var repo = new SetupService_repository_1.ServiceRepository();
var service = new SetUpService_service_1.ServiceService(repo);
var controller = new SetupService_controller_1.ServiceController(service);
/**
 * @swagger
 * definitions:
 *  SetupService:
 *   type: object
 *   properties:
 *    Zipcode:
 *     type: string
 *     description: Zipcode of customer
 *     example: '361006'
 */
/**
 * @swagger
 * /SetupService:
 *   post:
 *    summary: SetupService
 *    description: SetupService
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/SetupService'
 *    responses:
 *     200:
 *      description: Returns the Helpers found.
 *     404:
 *      description: No Helper Found in your Area
 *     403:
 *      description: Could Not Process request , Please enter the Zipcode
 *     400:
 *      description: Invalid or expired Authentication credentials.
 */
SetupServiceRouter.post('/SetupService', LoginController.validateToken, controller.setService);
module.exports = SetupServiceRouter;
