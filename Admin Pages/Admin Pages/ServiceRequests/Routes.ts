import express from "express";
import { celebrate } from "celebrate";

import { Repository } from "./Repository";
import { Service } from "./Service"; 
import { Controller } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";


const AdminSRRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: Repository = new Repository();
const service: Service = new Service(repo);
const controller: Controller = new Controller(service);

AdminSRRouter.get('/adminRoutes-getServiceRequests', LoginController.validateToken, controller.getAllServiceRequest);
AdminSRRouter.put('/adminRoutes-editServiceRequests/:ServiceId', LoginController.validateToken, controller.EditOrRescheduleService);
AdminSRRouter.put('/adminRoutes-CancelServiceRequests/:ServiceId', LoginController.validateToken, controller.CancelService);


export = AdminSRRouter;