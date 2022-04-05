import express from "express";
import { celebrate } from "celebrate";

import { Repository } from "./Repository";
import { Service } from "./Service"; 
import { Controller } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";


const HelperBlockCustomerRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: Repository = new Repository();
const service: Service = new Service(repo);
const controller: Controller = new Controller(service);

HelperBlockCustomerRouter.get('/getAllCustomers', LoginController.validateToken, controller.getAllCustomers);
HelperBlockCustomerRouter.post('/BlockCustomers/:TargetUserId', LoginController.validateToken, controller.BlockCustomers);
HelperBlockCustomerRouter.post('/UnblockCustomers/:TargetUserId', LoginController.validateToken, controller.UnBlockCustomers);


/**
 *@swagger
 * definitions:
 *  Blocked:
 *   type: object
 *   properties:
 *    IsBlocked:
 *     type: boolean
 *     example: 'true'
 */

/**
 * @swagger
 * /getAllCustomers:
 *  get:
 *   summary: Display customers
 *   description: list of customers worked with service provider in past
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: customers.
 *    401:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: Not worked with anyone yet.
 *    500:
 *     description: internal server error.
 * 
 */

 /**
 * @swagger
 * /BlockCustomers/{TargetUserId}:
 *  post:
 *   summary: Block  customer
 *   description: block  customer worked with service provider in past
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: TargetUserId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: Added To Block List.
 *    201:
 *     description: customer alraedy in blocked list.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    500:
 *     description: internal server error.
 */

 /**
 * @swagger
 * /UnblockCustomers/{TargetUserId}:
 *  post:
 *   summary: UnBlock  customer
 *   description: Unblock  customer worked with service provider in past
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: TargetUserId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Blocked'
 *   responses:
 *    200:
 *     description: Added To Unblock List.
 *    201:
 *     description: customer alraedy in Unblock list.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    500:
 *     description: internal server error.
 */



export = HelperBlockCustomerRouter;