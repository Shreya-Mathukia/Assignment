import express from "express"
import { ForgotPasswordController } from "./ForgotPassword.Controller";
import { ForgotPasswordRepository } from "./ForgotPassword.Repository";
import { ForgotPasswordService } from "./ForgotPassword.Service";
const ForgotPasswordrouter: express.Router = express.Router();
const repo: ForgotPasswordRepository = new ForgotPasswordRepository();
const service: ForgotPasswordService= new ForgotPasswordService(repo);
const controller: ForgotPasswordController = new ForgotPasswordController(service);
ForgotPasswordrouter.post('/ForgotPassword', controller.ForgotPassword);
 ForgotPasswordrouter.post('/ResetPassword', controller.ResetPassword);


export = ForgotPasswordrouter;