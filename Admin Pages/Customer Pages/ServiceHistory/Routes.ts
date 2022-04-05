import express from "express";
import { celebrate } from "celebrate";

import { HistoryRepository } from "./Repository";
import { HistorySchema } from "./Model";
import { HistoryService } from "./Service";
import { HistoryController } from "./Controller";

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";

const { ratingAdd } = HistorySchema;
const historyRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: HistoryRepository = new HistoryRepository();
const service: HistoryService = new HistoryService(repo);
const controller: HistoryController = new HistoryController(service);

/**
 *@swagger
 * definitions:
 *  Ratings:
 *   type: object
 *   properties:
 *    Comments:
 *     type: string
 *     description: date
 *     example: "30-02-2022"
 *    OnTimeArrival:
 *     type: float
 *     description: rating
 *     example: 1.5
 *    Friendly:
 *     type: float
 *     description: rating
 *     example: 1
 *    QualityOfService:
 *     type: float
 *     description: rating
 *     example: 2
 */


historyRouter.get('/Service-History', LoginController.validateToken, controller.history);
/**
 * @swagger
 * /Service-History:
 *  get:
 *   summary: User history
 *   description: history of users service request
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: history found.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: service request history not found in past.
 *    500:
 *     description: internal server error.
 */


historyRouter.get('/ServiceHistory/:ServiceId', LoginController.validateToken, controller.getServiceById);
/**
 * @swagger
 * /ServiceHistory/{ServiceId}:
 *  get:
 *   summary: history request detail
 *   description: users completed or cancelled service request detail
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
 *     description: detail found.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: No service request detail found with this service ID.
 *    500:
 *     description: internal server error.
 */

historyRouter.post('/giveRatings/:ServiceId', LoginController.validateToken, celebrate(ratingAdd), controller.giveRatings);
/**
 * @swagger
 * /giveRatings/{ServiceId}:
 *  post:
 *   summary: Ratings
 *   description: rete service provider
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
 *       $ref: '#/definitions/Ratings'
 *   responses:
 *    200:
 *     description: Success.
 *    201:
 *     description: You already gave Ratings.
 *    400:
 *     description: service request not completed or service provider not found.
 *    401:
 *     description: Service Request not completed or ServiceProvider Not found
 *    404:
 *     description: No service exists.
 *    500:
 *     description: internal server error.
 * 
 */

historyRouter.get('/export', LoginController.validateToken, controller.export);
 /**
 * @swagger
 * /export:
 *  get:
 *   summary: History download
 *   description: download history
 *   tags: 
 *    - Customer’s pages 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Data exported successfully.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    500:
 *     description: internal server error.
 * 
 */

export = historyRouter; 