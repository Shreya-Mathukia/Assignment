import express from "express";
import { celebrate } from "celebrate";

import { UserAddressRepository } from "./address.repository";
import { UserAddressSchema } from "./address.model";
import { UserAddressService } from "./address.service";
import { UserAddressController } from "./address.controller";

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";

const { addressAdd } = UserAddressSchema;
const userAddressRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: UserAddressRepository = new UserAddressRepository();
const service: UserAddressService = new UserAddressService(repo);
const controller: UserAddressController = new UserAddressController(service);

userAddressRouter.post('/user-address', celebrate(addressAdd), LoginController.validateToken, controller.UserAddress);

userAddressRouter.get('/get-user-addresses', LoginController.validateToken, controller.getAddresses);

export = userAddressRouter;