import express from "express"
import { loginRepository } from "./Login.Repository";
import { loginService } from "./Login.Service";
import { loginController } from "./Login.Controller";

import { celebrate } from 'celebrate';
import { UserSchema } from "../Users/Users.model";
const{ login } = UserSchema;
const Loginrouter: express.Router = express.Router();

const repo: loginRepository = new loginRepository();
const service: loginService= new loginService(repo);
const controller: loginController = new loginController(service);

/**
 * @swagger
 * definitions:
 *  Login: 
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'shreyakm00@gmail.com'
 *    Password:
 *     type: string
 *     description: Password of user
 *     example: 'tatva@123'
 */

/**
 * @swagger
 * /login:
 *   post:
 *    summary: login
 *    description: login
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/Login'
 *    responses:
 *     200:
 *      description: user logged in successfully
 *     500:
 *      description: failure in login
 */

Loginrouter.post('/',celebrate(login),controller.login);

Loginrouter.delete('/logout', controller.logout);

export = Loginrouter;