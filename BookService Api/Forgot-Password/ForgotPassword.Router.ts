import express from "express"
import { ForgotPasswordController } from "./ForgotPassword.Controller";
import { ForgotPasswordRepository } from "./ForgotPassword.Repository";
import { ForgotPasswordService } from "./ForgotPassword.Service";
import { celebrate } from "celebrate";
import { ResetPasswordSchema } from "./ForgotPassword.Model";
const { reset, forgot } = ResetPasswordSchema;

const ForgotPasswordrouter: express.Router = express.Router();
const repo: ForgotPasswordRepository = new ForgotPasswordRepository();
const service: ForgotPasswordService= new ForgotPasswordService(repo);
const controller: ForgotPasswordController = new ForgotPasswordController(service);


/**
 * @swagger
 * definitions:
 *  ForgotPassword: 
 *   type: object
 *   properties:
 *    Email:
 *     type: string
 *     description: Email of user
 *     example: 'shreyakm00@gmail.com'
 */

/**
 * @swagger
 * /ForgotPassword:
 *   post:
 *    summary: login
 *    description: login
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ForgotPassword'
 *    responses:
 *     200:
 *      description: Check your mail
 *     500:
 *      description: Invalid mail, Try agian or creating an account first.
 */

ForgotPasswordrouter.post('/ForgotPassword',celebrate(forgot), controller.ForgotPassword);

/**
 * @swagger
 * definitions:
 *  ResetPassword: 
 *   type: object
 *   properties:
 *    Password:
 *     type: string
 *     description: Password
 *     example: 'shreyakm0012345'
 *    ConfirmPassword:
 *     type: string
 *     description:  Reenter Password for confirmatio
 *     example: 'shreyakm0012345'
 */

/**
 * @swagger
 * /ResetPassword:
 *   post:
 *    summary: login
 *    description: login
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ResetPassword'
 *    responses:
 *     200:
 *      description: Password Reset
 *     500:
 *      description: Password Updation failed
 */

ForgotPasswordrouter.post('/ResetPassword',celebrate(reset), controller.ResetPassword);


export = ForgotPasswordrouter;