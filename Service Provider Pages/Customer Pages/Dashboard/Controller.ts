import { Request, Response } from 'express';
import { DashboardService } from './Service';
import jwt from "jsonwebtoken";
import { ServiceRequest } from '../../models/servicerequest';
require("dotenv").config();

export class DashboardController { 

  public constructor(private readonly DashboardService: DashboardService) {
    this.DashboardService = DashboardService;
  }

  public getSR = async (req: Request, res: Response) => {
    jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!, (err, helper:any) => {
      if(err) {
        
          return res.status(400).json("Invalid or expired token!");
      }
     else{
      return this.DashboardService.getSR().then(
        (service: ServiceRequest[] | any)=> {
            if(service){
                return res.status(200).json(service);
                }
            else
             return res.json("No Service history.")
        }
 
 
      ).catch((error: Error) => {
         return res.status(500).json({
           error: error
         });
       });
      }
  }); 
     }

     public ServiceHistory = async (req: Request, res: Response) => {
      jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!, (err, helper:any) => {
        if(err) {
            return res.status(400).json("Invalid or expired token!");
        }
       else{
        return this.DashboardService.ServiceHistory().then(
          (service: ServiceRequest[] | any)=> {
              if(service){
                  return res.status(200).json(service);
                  }
              else
               return res.json("No Service history.")
          }
   
   
        ).catch((error: Error) => {
           return res.status(500).json({
             error: error
           });
         });
        }
    }); 
       }



  public RescheduleService = async (req: Request, res: Response): Promise<Response> => {
    return this.DashboardService
      .RescheduleService(req.body,+req.params.ServiceId)
      .then((ServiceRequest) => {
          return res.status(200).json("Service Rescheduled");
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  }

  public CancelService = async (req: Request, res: Response): Promise<Response> => {
    return this.DashboardService
      .CancelService(+req.params.ServiceId)
      .then((ServiceRequest) => {
          return res.status(200).json("Service Canceled!");
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };



}