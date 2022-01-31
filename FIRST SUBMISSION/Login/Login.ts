import express from "express"
import { UsersRepository } from "../Users/Users.repository";
import { UsersService } from "../Users/Users.service";
import { UsersController } from "../Users/Users.Controller";


const Loginrouter: express.Router = express.Router();

const repo: UsersRepository = new UsersRepository();
const service: UsersService= new UsersService(repo);
const controller: UsersController = new UsersController(service);


export = Loginrouter;