import { NextFunction, Request, Response } from "express";
import { ScheduleService } from "./schedule.service";
import jwt from "jsonwebtoken";
require('dotenv').config();


export class ScheduleController {
  public constructor(private readonly scheduleService: ScheduleService) {
    this.scheduleService = scheduleService;
  }

  public decodeToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const token = req.headers.authorization;
    if(token) {
      jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
        if(error) {
          return res.status(400).json("Invalid Login!");
        }
        else {
          req.body.Zipcode = user.Zipcode;
          req.body.Email = user.Email;
          return this.scheduleService
            .findByEmail(user.Email)
            .then((user) => {
              
              if(user?.RoleId == '3') {
                next();
              }
              else {
                return res.status(400).json("You are not customer, try to login using customer account!");
              }
            })
            .catch((error: Error) => {
              return res.status(500).json({ error: error });
            });
        }
      });
    }
    else {
      return res.status(400).json("Token not exists!");
    }
  };

  public createService = async (req: Request, res: Response): Promise<Response | void> => {
    req.body.ServiceHourlyRate = 18;
    req.body.Discount = 0;
    req.body.ExtraHours = req.body.ExtraService * 0.5;
    req.body.Subtotal = req.body.ServiceHourlyRate * (req.body.ServiceHours + req.body.ExtraHours);
    req.body.TotalCost =  req.body.Subtotal - (req.body.Subtotal * 0.05);
    let max= 20000;
   req.body.ServiceId =  Math.floor(Math.random() * max) + 1;
      return this.scheduleService
        .findByEmail(req.body.Email)
        .then((user) => {
          if(user) {
            if(user.RoleId == '3') {
              req.body.UserId = user.id;
              req.body.ModifiedBy = user.id;
            }
            else {
              return res.status(404).json("You are not a Customer!");
            }
          }
          else {
            return res.status(404).json("No user exists with this email!");
          }
          return this.scheduleService
            .scheduleService(req.body)
            .then((service) => {
              const Email = req.body.Email;
             const Zipcode = req.body.Zipcode;
             const ServiceRequestId = service.ServiceRequestId;
             const token = this.scheduleService.generateToken(Email, Zipcode, ServiceRequestId);
            return res.status(200).cookie("token", token, {httpOnly: true}).json("Your Servie Schedule Successful.");
                   
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({ error: error , Message:"Request Failed."});
            });
        })
        .catch((error: Error) => {
          return res.status(500).json({ error: error });
        });
  };


}