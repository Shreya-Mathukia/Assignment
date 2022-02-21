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
              if(user?.RoleId === '1') {
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
    const token = req.headers.authorization;
    req.body.ServiceHourlyRate = 25;
    req.body.ExtraHours = req.body.ExtraService.length * 0.5;
    req.body.SubTotal = req.body.ServiceHourlyRate * req.body.ServiceHours
    req.body.TotalCost = req.body.ExtraService.length * 12.5 + req.body.SubTotal;
    req.body.ServiceRequestAddress.Email = req.body.Email;

      return this.scheduleService
        .findByEmail(req.body.Email)
        .then((user) => {
          if(user) {
            if(user.RoleId === '1') {
              req.body.UserId = user.RoleId;
              req.body.ModifiedBy = user.RoleId;
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
              return this.scheduleService
                .getSP()
                .then((sp) => {
                  if(sp) {
                    for(let email in sp) {
                      const serviceRequest = this.scheduleService.serviceRequest(sp[email].Email!).then((a: any)=> {
                        if(true){  return res.status(200).cookie("userEmail",req.body.Email).json("Check your mail");}
                      }).catch((error: Error) => {
                        return res.status(500).json({
                          error: error
                        });
                      });
                      
                    }
                    return res.status(200).json({ service });
                  }
                  else {
                    return res.status(404).json("No service provider found!");
                  }
                })
                .catch((error: Error) => {
                  return res.status(500).json({ error });
                });
            })
            .catch((error: Error) => {
              return res.status(500).json({ error: error });
            });
        })
        .catch((error: Error) => {
          return res.status(500).json({ error: error });
        });
  };
}