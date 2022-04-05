import express from "express";
import { celebrate } from "celebrate";

import { Repository } from "./Repository";
import { Service } from "./Service"; 
import { Controller } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";


const HelperServiceHistoryRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: Repository = new Repository();
const service: Service = new Service(repo);
const controller: Controller = new Controller(service);

/**
 * @swagger
 * /HelperServiceHistory:
 *  get:
 *   summary:  Serivce request history 
 *   description: service request history
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service request history.
 *    400:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: service request history not found in past.
 *    500:
 *     description: internal server error.
 */

 /**
 * @swagger
 * /HelperServiceDetails/{ServiceId}:
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
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: no service request detail found for this request.
 *    500:
 *     description: internal server error.
 * 
 */

  /**
 * @swagger
 * /HelperExportServiceHistory
 *  post:
 *   summary: History download
 *   description: download history
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: sevice request detail exported.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    500:
 *     description: internal server error.
 * 
 */

HelperServiceHistoryRouter.get('/HelperServiceHistory', LoginController.validateToken, controller.getServiceHistory);

HelperServiceHistoryRouter.get('/HelperServiceDetails/:ServiceId', LoginController.validateToken,  controller.getServiceDetailsById);

HelperServiceHistoryRouter.post('/HelperExportServiceHistory',LoginController.validateToken, controller.export);



export = HelperServiceHistoryRouter;