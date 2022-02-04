import express from "express"
import { loginRepository } from "./Login.Repository";
import { loginService } from "./Login.Service";
import { loginController } from "./Login.Controller";


const SignUprouter: express.Router = express.Router();

const repo: loginRepository = new loginRepository();
const service: loginService= new loginService(repo);
const controller: loginController = new loginController(service);

SignUprouter.post('/CreateAnAccount', controller.createCustomer);
SignUprouter.post('/BecomeHelper',controller.createServiceProvider);

export = SignUprouter;