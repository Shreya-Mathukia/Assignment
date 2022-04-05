import express from "express";
import { celebrate } from "celebrate";

import { Repository } from "./Repository";
import { Service } from "./Service"; 
import { Controller } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";


const UpcomingServiceRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: Repository = new Repository();
const service: Service = new Service(repo);
const controller: Controller = new Controller(service);

UpcomingServiceRouter.get('/HelperUpcomingService', LoginController.validateToken, controller.UpcomingServices);
/**
 * @swagger
 * /HelperUpcomingService:
 *  get:
 *   summary: Upcoming service request
 *   description: display upcoming service requests
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: upcoming service requests.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    401:
 *     description: no upcoming service requests found.
 *    500:
 *     description: internal server error.
 * 
 */

/**
 * @swagger
 * /HelperCancelService/{ServiceId}:
 *  put:
 *   summary: Cancel service request
 *   description: Cancel service request
 *   tags: 
 *    - Service Provider Screens 
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
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /HelperCompleteService/{ServiceId}:
 *  put:
 *   summary: Complete service request
 *   description: complete service request
 *   tags: 
 *    - Service Provider Screens 
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
 *     description: service request completed successfully.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    500:
 *     description: internal server error.
 */

 /**
 * @swagger
 * /HelperUpcomingServiceDetails/{ServiceId}:
 *  get:
 *   summary: Service request detail
 *   description: display service request detail
 *   tags: 
 *    - Service Provider Screens  
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
 *     description: sevice request detail.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: request detail not available.
 *    500:
 *     description: internal server error.
 * 
 */

UpcomingServiceRouter.get('/HelperUpcomingServiceDetails/:ServiceId', LoginController.validateToken,  controller.getServiceDetailsById);

UpcomingServiceRouter.put('/HelperCancelService/:ServiceId',LoginController.validateToken, controller.CancelService);

UpcomingServiceRouter.put('/HelperCompleteService/:ServiceId',LoginController.validateToken, controller.CompleteService);

export = UpcomingServiceRouter;