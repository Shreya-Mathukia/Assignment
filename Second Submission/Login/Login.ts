import express from "express"
import { loginRepository } from "./Login.Repository";
import { loginService } from "./Login.Service";
import { loginController } from "./Login.Controller";

import { celebrate } from 'celebrate';
import { UserSchema } from "../Users/Users.model";
const{ login } = UserSchema;
const Loginrouter: express.Router = express.Router();

const repo: loginRepository = new loginRepository();
const service: loginService= new loginService(repo);
const controller: loginController = new loginController(service);

Loginrouter.post('/',celebrate(login),controller.login);
export = Loginrouter;