import express from "express";
import { celebrate } from "celebrate";

import { Repository } from "./Repository";
import { Service } from "./Service"; 
import { Controller } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";


const AdminSRRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: Repository = new Repository();
const service: Service = new Service(repo);
const controller: Controller = new Controller(service);

/**
 *@swagger
 * definitions:
 *  Filters:
 *   type: object
 *   properties:
 *    ServiceId:
 *     type: integer
 *     description: service  id
 *     example: 1223 
 *    Status:
 *     type: string
 *     description: status
 *     example: 'Pending'
 *    PostalCode:
 *     type: string
 *     description: zipcode
 *     example: '395006'
 *    Email:
 *     type: string
 *     description: email of the user
 *     example: 'yashvantdesai7@gmail.com'
 *    UserId:
 *     type: integer
 *     description: user id
 *     example: 1
 *    ServiceProviderId:
 *     type: integer
 *     description: service provider id
 *     example: 3
 *    HasIssue:
 *     type: boolean
 *     example: 'false'
 *    FromDate:
 *     type: string
 *     description: from date
 *     example: "2022-10-01"
 *    ToDate:
 *     type: string
 *     description: to date
 *     example: "2022-10-03"
 *  EditReschedule:
 *   type: object
 *   properties:
 *    StreetName:
 *     type: string
 *     description: address
 *     example: 'Shoyo Colony 22'
 *    HouseName:
 *     type: string
 *     description: house number
 *     example: 'HOUSE 45'
 *    City:
 *     type: string
 *     description: city
 *     example: 'Rajkot' 
 *    PostalCode:
 *     type: string
 *     description: zipcode
 *     example: '12345'
 *    ServiceStartDate:
 *     type: string
 *     description: service start date
 *     example: "2022-10-02"
 *    ServiceStartTime:
 *     type: string
 *     description: service start time
 *     example: "17:30" 
 */


AdminSRRouter.get('/adminRoutes-getServiceRequests', LoginController.validateToken, controller.getAllServiceRequest);
/**
 * @swagger
 * /adminRoutes-getServiceRequests:
 *  get:
 *   summary: All serivce requests 
 *   description: Service requests
 *   tags: 
 *    - Admin Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: service requests.
 *    400:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404:
 *     description: No  service  found.
 *    500:
 *     description: internal server error.
 */

AdminSRRouter.put('/adminRoutes-editServiceRequests/:ServiceId', LoginController.validateToken, controller.EditOrRescheduleService);
/**
 * @swagger
 * /adminRoutes-editServiceRequests/{ServiceId}:
 *  put:
 *   summary: Edit service request
 *   description: change detail to update service request
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
 *       $ref: '#/definitions/EditReschedule'
 *   responses:
 *    200:
 *     description: service request updated successfully or service request address updated successfully.
 *    201: 
 *     description: Service Request Already Completed.
 *    400: 
 *     description: Invalid credentials.
 *    401:
 *     description: No request of given id.
 *    422: 
 *     description: error in rescheduling service request.
 *    500:
 *     description: internal server error.
 * 
 */

AdminSRRouter.put('/adminRoutes-CancelServiceRequests/:ServiceId', LoginController.validateToken, controller.CancelService);
/**
 * @swagger
 * /adminRoutes-CancelServiceRequests/{ServiceId}:
 *  put:
 *   summary: Cancel Service request
 *   description: feedback
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
 *   responses:
 *    200:
 *     description: service request cancelled successfully.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token or completed service request can not cancel or service request already cancelled / refunded.
 *    500:
 *     description: internal server error.
 * 
 */
AdminSRRouter.post('/filter-feature_SR',LoginController.validateToken,controller.filter_SR);
/**
 * @swagger
 * /filter-feature_SR:
 *  post:
 *   summary: Filter service requests
 *   description: apply filters
 *   tags: 
 *    - Admin Screens
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Filters'
 *   responses:
 *    200:
 *     description: sevice requests.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: No SR found.
 *    500:
 *     description: internal server error.
 * 
 */

export = AdminSRRouter;