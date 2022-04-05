import express from "express";
import { celebrate } from "celebrate";

import { Repository } from "./Repository";
import { Service } from "./Service"; 
import { Controller } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";


const HelperMyRatingsRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: Repository = new Repository();
const service: Service = new Service(repo);
const controller: Controller = new Controller(service);

HelperMyRatingsRouter.get('/HelperMyRatings', LoginController.validateToken, controller.getratings);

/**
 * @swagger
 * /HelperMyRatings:
 *  get:
 *   summary:  Ratings
 *   description:  display ratings of service provider given by customer
 *   tags: 
 *    - Service Provider Screens 
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: ratings.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: No Rating History.
 *    500:
 *     description: internal server error.
 */


export = HelperMyRatingsRouter;