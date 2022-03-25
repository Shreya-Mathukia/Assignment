import express from "express";
import { celebrate } from "celebrate";

import { Repository } from "./Repository";
import { Service } from "./Service"; 
import { Controller } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";


const AdminUMRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: Repository = new Repository();
const service: Service = new Service(repo);
const controller: Controller = new Controller(service);

AdminUMRouter.get('/adminRoutes-getUsers', LoginController.validateToken, controller.getAllUsers);
AdminUMRouter.put('/adminRoutes-Activate-Deactivate-User/:id', LoginController.validateToken, controller.EditUserStatus);
AdminUMRouter.put('/adminRoutes-Approve-HelperAccount/:id', LoginController.validateToken, controller.ApproveHelperAccount);





export = AdminUMRouter;