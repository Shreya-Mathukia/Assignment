import express from "express";
import { celebrate } from "celebrate";
import { ScheduleRepository } from "./schedule.repository";
import { ServiceRequestSchema } from "./schedule.model";
import { ScheduleService } from "./schedule.service";
import { ScheduleController } from "./schedule.controller";

import { loginRepository } from "../../../Login/Login.Repository";
import { loginService } from "../../../Login/Login.Service";
import { loginController } from "../../../Login/Login.Controller";

const { serviceAdd } = ServiceRequestSchema;

const scheduleRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: ScheduleRepository = new ScheduleRepository();
const service: ScheduleService = new ScheduleService(repo);
const controller: ScheduleController = new ScheduleController(service);


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

scheduleRouter.post('/ScheduleAndPlan',celebrate(serviceAdd), LoginController.validateToken, controller.decodeToken, controller.createService);

export = scheduleRouter;