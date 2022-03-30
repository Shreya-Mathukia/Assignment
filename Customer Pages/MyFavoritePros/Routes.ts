import express from "express"
import { Controller } from "./Controller";
import { Repository } from "./Repository";
import { Service } from "./Service";
import { celebrate } from "celebrate";

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";
import { FavSchema } from "./Model";

const FavProrouter: express.Router = express.Router();
const repo: Repository = new Repository();
const service: Service= new Service(repo);
const controller: Controller = new Controller(service);

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const { favAdd,blockAdd} = FavSchema;

/**
 * @swagger
 *  definitions:
 *   Favorite:
 *    type: object
 *    properties: 
 *     IsFavorite:
 *      type: boolean
 *      description: Is Favourite
 *      example: true
 *   Blocked:
 *    type: object
 *    properties:
 *     IsBlocked:
 *      type: boolean
 *      description: Is Blocked
 *      example: true  
 */

/**
 * @swagger
 * /AddFavouritePro/{spId}:
 *  post:
 *   summary: Create favorite pros
 *   description: Create favorite pros
 *   parameters:
 *    - in: header
 *      name: auth
 *      schema:
 *       type: string
 *    - in: path
 *      name: spId
 *      schema:
 *       type: integer
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Favorite'
 *   responses:
 *    200:
 *     description: Success
 *    500:
 *     description: Failure
 */
 FavProrouter.post('/AddFavouritePro/:spId', celebrate(favAdd), LoginController.validateToken, controller.FavSP, controller.removeFavSp);

 /**
  * @swagger
  * /get-all-pros:
  *  get:
  *   summary: Get all pros
  *   description: Get all pros
  *   parameters:
  *    - in: header
  *      name: auth
  *      schema:
  *       type: string
  *   responses:
  *    200:
  *     description: Success
  *    500: 
  *     description: Failure  
  */
  FavProrouter.get('/getSp', LoginController.validateToken, controller.SPworkedwithCustomer);
 
 /**
  * @swagger
  * /create-blocked-pros/{spId}:
  *  post:
  *   summary: Create blocked pros
  *   description: Create blocked pros
  *   parameters:
  *    - in: header
  *      name: auth
  *      schema:
  *       type: string
  *    - in: path
  *      name: spId
  *      schema:
  *       type: integer
  *   requestBody:
  *    content:
  *     application/json:
  *      schema:
  *       $ref: '#/definitions/Blocked'
  *   responses:
  *    200:
  *     description: Success
  *    500:
  *     description: Failure
  */
  FavProrouter.post('/BlockSp/:spId', celebrate(blockAdd), LoginController.validateToken, controller.blockSP, controller.removeBlockedSp); 



export = FavProrouter;