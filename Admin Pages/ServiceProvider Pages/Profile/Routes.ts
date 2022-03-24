import express from "express";
import { celebrate } from "celebrate";

import { ProfileRepository } from "./Repository";
import { SettingsSchema } from "./Model";
import { ProfileService } from "./Service"; 
import { ProfileController } from "./Controller"; 

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";

const { detailsAdd, addressAdd, passwordAdd } = SettingsSchema;
const ProfileRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: ProfileRepository = new ProfileRepository();
const service: ProfileService = new ProfileService(repo);
const controller: ProfileController = new ProfileController(service);

ProfileRouter.put('/HelperMyDetails',  celebrate(detailsAdd), controller.MyDetails);

ProfileRouter.put('/HelperEditAddress',celebrate(addressAdd), LoginController.validateToken, celebrate(addressAdd), controller.HelperAddress);

ProfileRouter.put('/HelperChangePassword', celebrate(passwordAdd),LoginController.validateToken, celebrate(passwordAdd), controller.changePassword);

export = ProfileRouter;