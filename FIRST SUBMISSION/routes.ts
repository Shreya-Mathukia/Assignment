import express from "express";


import { ContactusRepository } from "./ContactUS/Contactus.repository";
import { ContactusService } from "./ContactUS/Contactus.service";
import { ContactusController } from "./ContactUS/Contactus.controllers";


const router: express.Router = express.Router();

const repo: ContactusRepository = new ContactusRepository();
const service: ContactusService= new ContactusService(repo);
const controller: ContactusController = new ContactusController(service);

router.post('/ContactUs', controller.createUsers);
router.get('/ContactUs/:id',  controller.getById);
router.get('/ContactUs', controller.getAll);


export = router;