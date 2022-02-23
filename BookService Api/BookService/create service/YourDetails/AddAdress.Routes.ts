import express from "express";
import { celebrate } from "celebrate";


import { ServiceAddressController } from "./AddAddress.Controller";
import { ServiceAddressRepository } from "./AddAddress.Repository";
import { ServiceAddressService } from "./AddAdress.Service";
import { ServiceAddressSchema } from "./AddAddress.Model";


import { loginRepository } from "../../../Login/Login.Repository";
import { loginService } from "../../../Login/Login.Service";
import { loginController } from "../../../Login/Login.Controller";

const { addressAdd } = ServiceAddressSchema;

const YourDetailRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: ServiceAddressRepository = new ServiceAddressRepository();
const service: ServiceAddressService = new ServiceAddressService(repo);
const controller: ServiceAddressController = new ServiceAddressController(service);

YourDetailRouter.post('/YourDetails', LoginController.validateToken, controller.CreateServiceAddress);

export = YourDetailRouter;