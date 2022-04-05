import express from "express";
import { celebrate } from "celebrate";

import { MySettingsRepository } from "./Repository";
import { SettingsSchema } from "./Model";
import { MySettingsService } from "./Service"; 
import { MySettingsController } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";

const { detailsAdd, addressAdd, passwordAdd } = SettingsSchema;
const settingsRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: MySettingsRepository = new MySettingsRepository();
const service: MySettingsService = new MySettingsService(repo);
const controller: MySettingsController = new MySettingsController(service);
/**
 *@swagger
 * definitions:
 *  UpdateUser:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: first name of the user
 *     example: 'Shreya'
 *    LastName:
 *     type: string
 *     description: last name of the user
 *     example: 'Mathukia'
 *    Mobile:
 *     type: string
 *     description: phone number
 *     example: "7990602480"
 *    DOB:
 *     type: string
 *     description: birth date
 *     example: "2000-10-30"
 *    LanguageId:
 *     type: string
 *     description: language 
 *     example: English
 *  UpdateCreateAddress:
 *     type: object
 *     properties:
 *      StreetName:
 *       type: string
 *       description: address
 *       example: 'New Shaktivijay'
 *      HouseNumber:
 *       type: string
 *       description: house number
 *       example: '44'
 *      PostalCode:
 *       type: string
 *       description: zipcode
 *       example: '395006'
 *      City:
 *       type: string
 *       description: city
 *       example: 'Surat'
 *      Mobile:
 *       type: string
 *       description: phone number
 *       example: "7990602480"
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
 *     example: 'Qytwer111'
 *    ConfirmPassword:
 *     type: string
 *     description: password
 *     example: 'Qytwer111'
 */


settingsRouter.put('/MyDetails',  celebrate(detailsAdd), controller.MyDetails);
/**
 * @swagger
 * /MyDetails:
 *  put:
 *   summary: User detail
 *   description: Display user details.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   responses:
 *    200:
 *     description: Deetail Saved.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token.
 *    404:
 *     description: No user found with this email!.
 *    500:
 *     description: internal server error.
 */

settingsRouter.put('/EditAddress/:Id', LoginController.validateToken, celebrate(addressAdd), controller.updateUserAddress);
/**
 * @swagger
 * /EditAddress/{Id}:
 *  put:
 *   summary: Update address
 *   description: Change detail to update address.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: Id
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateCreateAddress'
 *   responses:
 *    201:
 *     description: address updated successfully.
 *    404:
 *     description: Enter valid Id!.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    401:
 *     description: No user found with this email
 *    500:
 *     description: Internal Server Error.
 * 
 */

settingsRouter.post('/AddAddress', LoginController.validateToken, celebrate(addressAdd), controller.CreateUserAddress);
/**
 * @swagger
 * /AddAddress:
 *  post:
 *   summary: Add address
 *   description: Add detail to Create address.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/UpdateCreateAddress'
 *   responses:
 *    200:
 *     description: Address.
 *    401:
 *     description: No token exists!!.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    500:
 *     description: Internal Server Error.
 * 
 */


settingsRouter.put('/DeleteAddress/:Id', LoginController.validateToken, controller.deleteAddress);
/**
 * @swagger
 * /DeleteAddress/{Id}:
 *  put:
 *   summary: Delete address
 *   description: Delete Address.
 *   tags: 
 *    - Customer’s pages
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: Id
 *      schema:
 *       type: integer
 *   responses:
 *    201:
 *     description: Address Deleted successfully.
 *    404:
 *     description: Enter valid Id!.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    500:
 *     description: Internal Server Error.
 * 
 */

settingsRouter.put('/ChangePassword', LoginController.validateToken, celebrate(passwordAdd), controller.changePassword);
/**
 * @swagger
 * /ChangePassword:
 *  put:
 *   summary: Change Password
 *   description: Change Password of user.
 *   tags: 
 *    - Customer’s pages
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
 *     description: Password changed Successfully!
 *    401:
 *     description:New Password Can't be same as old Password!.
 *    400:
 *     description: invalid login credential or Unauthorised user or invalid or expired token
 *    404:
 *     description: Incorrect Old Password
 *    500:
 *     description: Internal Server Error.
 * 
 */

export = settingsRouter;