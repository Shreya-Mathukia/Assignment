import express from "express";
import { celebrate } from 'celebrate';
import { ContactUsSchema } from "./ContactUs.model";
import { ContactusRepository } from "./Contactus.repository";
import { ContactusService } from "./Contactus.service";
import { ContactusController } from "./Contactus.controllers";

const {  get, add } = ContactUsSchema;
const router: express.Router = express.Router();

const repo: ContactusRepository = new ContactusRepository();
const service: ContactusService= new ContactusService(repo);
const controller: ContactusController = new ContactusController(service);

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
 *    tags: 
 *    - ContactUs Screens
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

router.post('/ContactUs', celebrate(add), controller.createUsers);

/**
 * @swagger
 * /ContactUs/{id}:
 *  get:
 *   summary: get request by Id.
 *   description: get request by Id.
 *   tags: 
 *    - ContactUs Screens
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
 *   tags: 
 *    - ContactUs Screens
 *   responses:
 *    200:
 *     description: List of Request.
 *    500:
 *     description: error
 */

router.get('/ContactUs', controller.getAll);


export = router;