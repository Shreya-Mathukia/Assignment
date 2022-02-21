import express from "express";
import { celebrate } from "celebrate";
import { ScheduleRepository } from "./schedule.repository";
import { ServiceRequestSchema } from "./schedule.model";
import { ScheduleService } from "./schedule.service";
import { ScheduleController } from "./schedule.controller";

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";

const { serviceAdd } = ServiceRequestSchema;

const scheduleRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: ScheduleRepository = new ScheduleRepository();
const service: ScheduleService = new ScheduleService(repo);
const controller: ScheduleController = new ScheduleController(service);

scheduleRouter.post('/schedule-plan', LoginController.validateToken, controller.decodeToken, controller.createService);

export = scheduleRouter;