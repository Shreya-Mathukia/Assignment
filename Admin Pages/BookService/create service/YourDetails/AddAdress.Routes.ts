import express from "express";
import { celebrate } from "celebrate";


import { ServiceAddressController } from "./AddAddress.Controller";
import { ServiceAddressRepository } from "./AddAddress.Repository";
import { ServiceAddressService } from "./AddAdress.Service";
import { ServiceAddressSchema } from "./AddAddress.Model";


import { loginRepository } from "../../../Login/Login.Repository";
import { loginService } from "../../../Login/Login.Service";
import { loginController } from "../../../Login/Login.Controller";

const { addressAdd } = ServiceAddressSchema;

const YourDetailRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: ServiceAddressRepository = new ServiceAddressRepository();
const service: ServiceAddressService = new ServiceAddressService(repo);
const controller: ServiceAddressController = new ServiceAddressController(service);

/**
 * @swagger
 * definitions:
 *  YourDetails:
 *   type: object
 *   properties:
 *    AddressLine1:
 *     type: string
 *     description: Street Name
 *     example: 'Ram Park Colony'
 *    AddressLine2:
 *     type: string
 *     description: House Number
 *     example: '401 Heet Palace'
 *    City:
 *     type: string
 *     description: City 
 *     example: 'Rajkot'
 *    State:
 *     type: string
 *     description: State
 *     example: 'Gujarat'
 *    Mobile:
 *     type: string
 *     description: Mobile number of service provider
 *     example: '9898077484'
 */

/**
 * @swagger
 * /YourDetails:
 *   post:
 *    summary: Create SR Address
 *    description: Create SR Address
 *    tags: 
 *      - Book Service Screens
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/YourDetails'
 *    responses:
 *     200:
 *      description: SR Address added.
 *     500:
 *      description: Error
 *     400:
 *      description: Authentication Error.
 *     404:
 *       description: Restart Book Service Procedure!
 */

YourDetailRouter.post('/YourDetails', LoginController.validateToken, controller.CreateServiceAddress);

export = YourDetailRouter;