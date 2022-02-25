"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var schedule_repository_1 = require("./schedule.repository");
var schedule_model_1 = require("./schedule.model");
var schedule_service_1 = require("./schedule.service");
var schedule_controller_1 = require("./schedule.controller");
var Login_Repository_1 = require("../../../Login/Login.Repository");
var Login_Service_1 = require("../../../Login/Login.Service");
var Login_Controller_1 = require("../../../Login/Login.Controller");
var serviceAdd = schedule_model_1.ServiceRequestSchema.serviceAdd;
var scheduleRouter = express_1.default.Router();
var repo1 = new Login_Repository_1.loginRepository();
var service1 = new Login_Service_1.loginService(repo1);
var LoginController = new Login_Controller_1.loginController(service1);
var repo = new schedule_repository_1.ScheduleRepository();
var service = new schedule_service_1.ScheduleService(repo);
var controller = new schedule_controller_1.ScheduleController(service);
/**
 * @swagger
 * definitions:
 *  ScheduleandPlan:
 *   type: object
 *   properties:
 *    ServiceStartDate:
 *     type: date
 *     description: Service date.
 *     example: '2022-02-18'
 *    ServiceStartTime:
 *     type: time
 *     description: time for providing service.
 *     example: '10:30'
 *    ServiceHours:
 *     type: integer
 *     description:  time duartion service request.
 *     example: '3'
 *    ExtraService:
 *     type: integer
 *     description: Number of other extra service you want.
 *     example: '3'
 *    Comments:
 *     type: string
 *     description: Comments
 *     example: 'Bring cleaning tools.'
 *    Haspets:
 *     type: boolean
 *     description: user own pets?
 *     example: 'yes'
 */

/**
 * @swagger
 * /ScheduleAndPlan:
 *   post:
 *    summary: ScheduleAndPlan
 *    description: ScheduleAndPlan
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ScheduleandPlan'
 *    responses:
 *     200:
 *      description: Your Service Scheduled.
 *     500:
 *      description: Error
 *     400:
 *      description: Authentication Error.
 */
scheduleRouter.post('/ScheduleAndPlan', (0, celebrate_1.celebrate)(serviceAdd), LoginController.validateToken, controller.decodeToken, controller.createService);
module.exports = scheduleRouter;
