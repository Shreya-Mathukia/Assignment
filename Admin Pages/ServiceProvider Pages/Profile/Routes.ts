import express from "express";
import { celebrate } from "celebrate";

import { ProfileRepository } from "./Repository";
import { SettingsSchema } from "./Model";
import { ProfileService } from "./Service"; 
import { ProfileController } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";

const { detailsAdd, addressAdd, passwordAdd } = SettingsSchema;
const ProfileRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: ProfileRepository = new ProfileRepository();
const service: ProfileService = new ProfileService(repo);
const controller: ProfileController = new ProfileController(service);


/**
 *@swagger
 * definitions:
 *  UpdateUser:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: first name of the user
 *     example: 'Yashvantray'
 *    LastName:
 *     type: string
 *     description: last name of the user
 *     example: 'Desai'
 *    Mobile:
 *     type: string
 *     description: phone number
 *     example: "7990602480"
 *    DateOfBirth:
 *     type: string
 *     description: birth date
 *     example: "30-10-2000"
 *    NationalityId:
 *     type: integer
 *     description: nationality
 *     example: 1 
 *    Gender:
 *     type: string
 *     description: gender
 *     example: "Male / Female"
 *  Address:
 *   type: object
 *   properties:
 *       StreetName:
 *        type: string
 *        description: address
 *        example: 'New Shaktivijay'
 *       HouseNumber:
 *        type: string
 *        description: house number
 *        example: '44'
 *       PostalCode:
 *        type: string
 *        description: zipcode
 *        example: '395006'
 *       City:
 *        type: string
 *        description: city
 *        example: 'Surat'
 *  ChangePassword:
 *   type: object
 *   properties: 
 *    OldPassword:
 *     type: string
 *     description: password
 *     example: 'Tatva@123'
 *    NewPassword:
 *     type: string
 *     description: password
 *     example: 'Shreya123'
 *    ConfirmPassword:
 *     type: string
 *     description: password
 *     example: 'Shreya123'
 */
ProfileRouter.put('/HelperMyDetails',  celebrate(detailsAdd), controller.MyDetails);

ProfileRouter.put('/HelperEditAddress',celebrate(addressAdd), LoginController.validateToken, celebrate(addressAdd), controller.HelperAddress);

ProfileRouter.put('/HelperChangePassword', celebrate(passwordAdd),LoginController.validateToken, celebrate(passwordAdd), controller.changePassword);

/**
 * @swagger
 * /HelperMyDetails:
 *  put:
 *   summary: Update service provider detail
 *   description: edit user details to update.
 *   tags: 
 *    - Service Provider Screens
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateUser'
 *   responses:
 *    200:
 *     description: details updated successfully.
 *    400:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    404: 
 *     description: No user found with this email.
 *    500:
 *     description: internal server error.
 */

/**
 * @swagger
 * /HelperEditAddress:
 *  put:
 *   summary: Update service provider Address
 *   description: edit user Address to update.
 *   tags: 
 *    - Service Provider Screens
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Address'
 *   responses:
 *    200:
 *     description: Address Updated.
 *    201:
 *     description: Address details Added.
 *    404: 
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    500:
 *     description: internal server error.
 */

 //Change Password

  /**
 * @swagger
 * /HelperChangePassword:
 *  put:
 *   summary: Change password
 *   description: enter old password and new password.
 *   tags: 
 *    - Service Provider Screens
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/ChangePassword'
 *   responses:
 *    200:
 *     description: password changed successfully.
 *    400:
 *     description: invalid login credential or unauthorised user or invalid or expired token.
 *    401:
 *     description: incorrect old password 
 *    404:
 *     description: User not exist.
 *    500:
 *     description: internal server error.
 * 
 */

export = ProfileRouter;