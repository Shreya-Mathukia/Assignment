import express from "express";
import { celebrate } from "celebrate";

import { ServiceRepository } from "./SetupService.repository";
import { ServiceSchema } from "./SetupService.models";
import { ServiceService } from "./SetUpService.service";
import { ServiceController } from "./SetupService.controller";

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";

const { zipAdd } = ServiceSchema;
const SetupServiceRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: ServiceRepository = new ServiceRepository();
const service: ServiceService = new ServiceService(repo);
const controller: ServiceController = new ServiceController(service);
/**
 * @swagger
 * definitions:
 *  SetupService: 
 *   type: object
 *   properties:
 *    Zipcode:
 *     type: string
 *     description: Zipcode of customer
 *     example: '361006'
 */

/**
 * @swagger
 * /SetupService:
 *   post:
 *    summary: SetupService
 *    description: SetupService
 *    tags: 
 *      - Book Service Screens
 *    parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/SetupService'
 *    responses:
 *     200:
 *      description: Returns the Helpers found.
 *     404:
 *      description: No Helper Found in your Area
 *     403:
 *      description: Could Not Process request , Please enter the Zipcode
 *     400:
 *      description: Invalid or expired Authentication credentials.
 */

SetupServiceRouter.post('/SetupService', LoginController.validateToken, controller.setService);

export = SetupServiceRouter;