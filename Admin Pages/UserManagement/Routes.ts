import express from "express";
import { celebrate } from "celebrate";

import { Repository } from "./Repository";
import { Service } from "./Service"; 
import { Controller } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";


const AdminUMRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: Repository = new Repository();
const service: Service = new Service(repo);
const controller: Controller = new Controller(service);
/**
 *@swagger
 * definitions:
 *  RefundAmount:
 *   type: object
 *   properties:
 *    Percentage:
 *     type: integer
 *     description: Percentage of Paid Amount to refunded.
 *     example: 25
 *    PaidAmount:
 *     type: integer
 *     description: service request id
 *     example: 74
 *    RefundedAmount:
 *     type: integer
 *     description: service request id
 *     example: 40
 *    Comment:
 *     type: string
 *     description: notes
 *     example: 'comment'
 */



AdminUMRouter.get('/adminRoutes-getUsers', LoginController.validateToken, controller.getAllUsers);
/**
 * @swagger
 * /adminRoutes-getUsers:
 *  get:
 *   summary: All users
 *   description: users
 *   tags: 
 *    - Admin Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: users.
 *    400:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    401:
 *     description: ERROR!!!! NOT ADMIN .
 *    500:
 *     description: internal server error.
 */

AdminUMRouter.put('/adminRoutes-Activate-Deactivate-User/:id', LoginController.validateToken, controller.EditUserStatus);
/**
 * @swagger
 * /adminRoutes-Activate-Deactivate-User/{id}:
 *  put:
 *   summary: Activate-Deactivate users Accounts.
 *   description: users
 *   tags: 
 *    - Admin Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: user activated/inactivated successfully.
 *    400:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: No user of given Id.
 *    422: 
 *     description: ERROR!!!! NOT ADMIN.
 *    500:
 *     description: internal server error.
 */

AdminUMRouter.put('/adminRoutes-Approve-HelperAccount/:id', LoginController.validateToken, controller.ApproveHelperAccount);
/**
 * @swagger
 * /adminRoutes-Approve-HelperAccount/{id}:
 *  put:
 *   summary: Approve Helper Accounts.
 *   description: users
 *   tags: 
 *    - Admin Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *   responses:
 *    200:
 *     description: Service Provider Account Approved.
 *    400:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: No user of given Id.
 *    422: 
 *     description: ERROR!!!! NOT ADMIN.
 *    500:
 *     description: internal server error.
 */

AdminUMRouter.post('/refund-amount/:ServiceId',LoginController.validateToken,controller.refundAmount);
/**
 * @swagger
 * /refund-amount/{ServiceId}:
 *  post:
 *   summary: Refund amaount
 *   description: refunds
 *   tags: 
 *    - Admin Screens 
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
 *       $ref: '#/definitions/RefundAmount'
 *   responses:
 *    200:
 *     description: service request refunded successfully.
 *    401:
 *     description: invalid login credential or unauthorised user or invalid or expired token / refund amount must be less than paid amount.
 *    404:
 *     description: service request not found or service request not completed.
 *    422: 
 *     description: amount not refunded.
 *    500:
 *     description: internal server error.
 */





export = AdminUMRouter;