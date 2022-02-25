import express from "express";
import { celebrate } from "celebrate";

import { UserAddressRepository } from "./address.repository";
import { UserAddressSchema } from "./address.model";
import { UserAddressService } from "./address.service";
import { UserAddressController } from "./address.controller";

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";

const { addressAdd } = UserAddressSchema;
const userAddressRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: UserAddressRepository = new UserAddressRepository();
const service: UserAddressService = new UserAddressService(repo);
const controller: UserAddressController = new UserAddressController(service);

/**
 * @swagger
 * definitions:
 *  CreateUserAddress:
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
 * /CreateUserAddress:
 *   post:
 *    summary: Create User Address
 *    description: Create User Address
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/CreateUserAddress'
 *    responses:
 *     200:
 *      description: Youe Address added.
 *     500:
 *      description: Error
 *     400:
 *      description: Authentication Error.
 */

userAddressRouter.post('/CreateUserAddress', celebrate(addressAdd), LoginController.validateToken, controller.CreateUserAddress);

/**
 * @swagger
 * /getUserAddresses:
 *  get:
 *   summary: get all address of logged in user.
 *   description: get all address of logged in user.
 *   responses:
 *    200:
 *     description: List of Addresses.
 *    500:
 *     description: error
 */

userAddressRouter.get('/getUserAddresses', LoginController.validateToken, controller.getAddresses);

export = userAddressRouter;