import express from "express";
import { celebrate } from "celebrate";

import { Repository } from "./Repository";
import { Service } from "./Service"; 
import { Controller } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";


const HelperNewServiceRequestRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: Repository = new Repository();
const service: Service = new Service(repo);
const controller: Controller = new Controller(service);

HelperNewServiceRequestRouter.get('/getNewServiceRequest', LoginController.validateToken, controller.getNewServiceRequest);
/**
 * @swagger
 * /getNewServiceRequest:
 *  get:
 *   summary: New serivce requests 
 *   description: Service requests
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service request accepted successfully.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description:  service requests not found. 
 *    500:
 *     description: internal server error.
 */

HelperNewServiceRequestRouter.get('/getNewServiceDetails/:ServiceId', LoginController.validateToken, controller.getServiceDetailsById);
/**
 * @swagger
 * /getNewServiceDetails/{ServiceId}:
 *  get:
 *   summary: Service requests Details
 *   description: Service requests Details
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
 *     description: service request .
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: no service request of this Id.
 *    500:
 *     description: internal server error.
 */

HelperNewServiceRequestRouter.put('/AcceptServiceRequest/:ServiceId', LoginController.validateToken, controller.AcceptServiceRequest);
/**
 * @swagger
 * /AcceptServiceRequest/{ServiceId}:
 *  put:
 *   summary: Accept service request
 *   description: helper can accept new service request
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
 *     description: service request accepted successfully.
 *    400: 
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    201:
 *     description: another service request has already been assigned which has time overlap with this service request.You can’t pick this one!
 *    202:
 *     description:  You can't accept,Has Pets / Cannot accept this Request due to different Zipcode or You may are blocked.
 *    500:
 *     description: internal server error.
 */




export = HelperNewServiceRequestRouter;