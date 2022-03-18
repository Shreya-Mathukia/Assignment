import express from "express";
import { celebrate } from "celebrate";

import { HistoryRepository } from "./Repository";
import { HistorySchema } from "./Model";
import { HistoryService } from "./Service";
import { HistoryController } from "./Controller";

import { loginRepository } from "../../Login/Login.Repository";
import { loginService } from "../../Login/Login.Service";
import { loginController } from "../../Login/Login.Controller";

const { ratingAdd } = HistorySchema;
const historyRouter: express.Router = express.Router();

const repo1: loginRepository = new loginRepository();
const service1: loginService= new loginService(repo1);
const LoginController: loginController = new loginController(service1);

const repo: HistoryRepository = new HistoryRepository();
const service: HistoryService = new HistoryService(repo);
const controller: HistoryController = new HistoryController(service);


historyRouter.get('/Service-History', LoginController.validateToken, controller.history);

historyRouter.get('/ServiceHistory/:ServiceId', LoginController.validateToken, controller.getServiceById);

historyRouter.post('/giveRatings/:ServiceId', LoginController.validateToken, celebrate(ratingAdd), controller.giveRatings);

historyRouter.get('/export', LoginController.validateToken, controller.export);

export = historyRouter;