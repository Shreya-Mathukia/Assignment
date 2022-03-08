import express from "express"
import { DashboardController } from "./Controller";
import { DashboardRepository } from "./Repository";
import { DashboardService } from "./Service";
import { celebrate } from "celebrate";

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";
import { ServiceRequestSchema } from "./Model";

const Dashboardrouter: express.Router = express.Router();
const repo: DashboardRepository = new DashboardRepository();
const service: DashboardService= new DashboardService(repo);
const controller: DashboardController = new DashboardController(service);

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const { serviceupdate} = ServiceRequestSchema;

/**
 * @swagger
 * definitions:
 *  ForgtPassword: 
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
 *    description: 
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
 Dashboardrouter.get('/Dashboard', LoginController.validateToken, controller.getSR);
 Dashboardrouter.post('/RescheduleService/:ServiceId', celebrate(serviceupdate) ,LoginController.validateToken, controller.RescheduleService);
 Dashboardrouter.post('/CancelService/:ServiceId', LoginController.validateToken, controller.CancelService);
 Dashboardrouter.get('/ServiceHistory', LoginController.validateToken, controller.ServiceHistory);



export = Dashboardrouter;