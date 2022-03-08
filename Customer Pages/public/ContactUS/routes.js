"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var express_1 = __importDefault(require("express"));
var celebrate_1 = require("celebrate");
var ContactUs_model_1 = require("./ContactUs.model");
var Contactus_repository_1 = require("./Contactus.repository");
var Contactus_service_1 = require("./Contactus.service");
var Contactus_controllers_1 = require("./Contactus.controllers");
var get = ContactUs_model_1.ContactUsSchema.get, add = ContactUs_model_1.ContactUsSchema.add;
var router = express_1.default.Router();
var repo = new Contactus_repository_1.ContactusRepository();
var service = new Contactus_service_1.ContactusService(repo);
var controller = new Contactus_controllers_1.ContactusController(service);

/**
 * @swagger
 * definitions:
 *  ContactUs:
 *   type: object
 *   properties:
 *    FirstName:
 *     type: string
 *     description: First name
 *     example: 'Ram'
 *    LastName:
 *     type: string
 *     description: Last name 
 *     example: 'Dinkar'
 *    Email:
 *     type: string
 *     description: Email 
 *     example: 'rd20@gmail.com'
 *    Subject:
 *     type: string
 *     description: Password of service provider
 *     example: 'Need Asistance'
 *    Message:
 *     type: string
 *     description: Password of service provider
 *     example: 'Want to register as service provider ,request still not accepted.'
 *    UploadFileName:
 *     type: string
 *     description: Confirmed Password of service provider
 *     example: 'ss23.jpg'
 *    Mobile:
 *     type: string
 *     description: Mobile number
 *     example: '9898077484'
 */

/**
 * @swagger
 * /ContactUs:
 *   post:
 *    summary: create ContactUs request.
 *    description: create request.
 *    requestBody:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: '#/definitions/ContactUs'
 *    responses:
 *     200:
 *      description: Request Created Success.
 *     500:
 *      description: error
 */
router.post('/ContactUs', (0, celebrate_1.celebrate)(add), controller.createUsers);
/**
 * @swagger
 * /ContactUs/{ContactUs_id}:
 *  get:
 *   summary: get request by Id.
 *   description: get request by Id.
 *   parameters:
 *    - in: path
 *      name: id
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the request
 *      example: 2
 *   responses:
 *    200:
 *     description: success
 *    500:
 *      description: Error
 */
 router.get('/ContactUs/:id',  controller.getById);

 /**
  * @swagger
  * /ContactUs:
  *  get:
  *   summary: get all ContactUs Requets.
  *   description: get all ContactUs Requets.
  *   responses:
  *    200:
  *     description: List of Request.
  *    500:
  *     description: error
  */

router.get('/ContactUs', controller.getAll);
module.exports = router;
