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
 *@swagger
 * definitions:
 *  RescheduleService:
 *   type: object
 *   properties:
 *    ServiceStartDate:
 *     type: string
 *     description: date
 *     example: "2022-10-02"
 *    ServiceStartTime:
 *     type: string
 *     description: time
 *     example: "16:30"
 */


 Dashboardrouter.get('/Dashboard', LoginController.validateToken, controller.getSR);
 /**
 * @swagger
 * /Dashboard:
 *  get:
 *   summary: Get requests of user
 *   description: User dashboard
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: requests .
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: No Service Request found.
 *    500:
 *     description: internal server error.
 */

 Dashboardrouter.get('/Dashboard/ServiceDetails/:ServiceId', LoginController.validateToken, controller.ServiceDetails);
 /**
 * @swagger
 * /Dashboard/ServiceDetails/{ServiceId}:
 *  get:
 *   summary: Get request detail
 *   description: Request detail by id
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: request detail found.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: NO SUCH SERVICE Exist!
 *    500:
 *     description: internal server error.
 */

 Dashboardrouter.post('/RescheduleService/:ServiceId', celebrate(serviceupdate) ,LoginController.validateToken, controller.RescheduleService);
  /**
 * @swagger
 * /RescheduleService/{ServiceId}:
 *  post:
 *   summary: Reschedule Service request
 *   description: Enter date and time
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/RescheduleService'
 *   responses:
 *    200:
 *     description: sevice request reschedule successfully.
 *    201:
 *     description: Another Service Request of ServiceId #${a2} has already been assigned which has time overlap with service request. You can't pick this one!.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: No request of given id
 *    500:
 *     description: failure in finding service provider.
 * 
 */

 Dashboardrouter.post('/CancelService/:ServiceId', LoginController.validateToken, controller.CancelService);
 /**
 * @swagger
 * /CancelService/{ServiceId}:
 *  post:
 *   summary: Cancel Service request
 *   description: feedback
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: ServiceId
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: service request cancelled successfully.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    500:
 *     description: internal server error.
 * 
 */

 



export = Dashboardrouter;