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
router.post('/ContactUs', (0, celebrate_1.celebrate)(add), controller.createUsers);
router.get('/ContactUs/:id', controller.getById);
router.get('/ContactUs', controller.getAll);
module.exports = router;
