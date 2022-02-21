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

router.post('/ContactUs', celebrate(add), controller.createUsers);
router.get('/ContactUs/:id',  controller.getById);
router.get('/ContactUs', controller.getAll);


export = router;