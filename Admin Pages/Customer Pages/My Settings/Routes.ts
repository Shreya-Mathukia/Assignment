import express from "express";
import { celebrate } from "celebrate";

import { MySettingsRepository } from "./Repository";
import { SettingsSchema } from "./Model";
import { MySettingsService } from "./Service"; 
import { MySettingsController } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";

const { detailsAdd, addressAdd, passwordAdd } = SettingsSchema;
const settingsRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: MySettingsRepository = new MySettingsRepository();
const service: MySettingsService = new MySettingsService(repo);
const controller: MySettingsController = new MySettingsController(service);

settingsRouter.put('/MyDetails',  celebrate(detailsAdd), controller.MyDetails);

settingsRouter.put('/EditAddress/:Id', LoginController.validateToken, celebrate(addressAdd), controller.updateUserAddress);

settingsRouter.post('/AddAddress', LoginController.validateToken, celebrate(addressAdd), controller.CreateUserAddress);


settingsRouter.put('/DeleteAddress/:Id', LoginController.validateToken, controller.deleteAddress);

settingsRouter.put('/ChangePassword', LoginController.validateToken, celebrate(passwordAdd), controller.changePassword);

export = settingsRouter;