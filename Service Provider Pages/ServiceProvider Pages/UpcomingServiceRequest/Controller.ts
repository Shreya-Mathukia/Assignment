import { Request, Response, NextFunction } from "express";
import { ServiceRequest } from "../../models/servicerequest";
import { Service } from "./Service";
import jwt from "jsonwebtoken";
require('dotenv').config();

export class Controller {
    public constructor(private readonly Service: Service) {
        this.Service = Service;
    }

    public UpcomingServices = async(req: Request, res: Response): Promise<Response | undefined> => {
        let serviceRequest: ServiceRequest[] = [];
        const token = req.headers.authorization;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.Service
                      .findUser(user.Email)
                      .then((user: any) => {
                            return this.Service.getAllUpcomingRequest(user.id)
                            .then(async (service) => {
                                if(service) {
                                    if(service.length > 0) {
                                        for(let s in service) {
                                            
                                                serviceRequest.push(service[s]);
                                            }
                                        if(serviceRequest.length > 0) {
                                            return res.status(200).json({ serviceRequest });
                                        }
                                        else {
                                            return res.status(400).json("No Upcoming Service !");
                                        }
                                    }
                                    else {
                                        return res.status(400).json("No Upcoming Service !");
                                    }
                                }
                                else {
                                    return res.status(400).json("No Upcoming Service !");
                                }
                            })
                            .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                        
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Error!");
        }
    };

    public getServiceDetailsById = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        let flag:number= 0;
        let uId:any;
        let srId:any;
        let details:any = {};
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {

                await this.Service.getServiceDetailsById(+req.params.ServiceId).then((service) =>{
                      if(service){
                        uId= service?.UserId;
                        srId = service?.ServiceRequestId; 
                       details.ServiceDetails = service;
                      }
                     else{
                        flag =2;
                     }                  
                    }).catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                      
                await this.Service.getUserDetails(uId).then((user) =>{
                     if(user){details.UserDetails = user;}
                       
                      
                    }).catch((error: Error) => {
                            return res.status(500).json({ error: error });
                          });    
         
                await this.Service.getServiceAddress(srId).then((address) =>{
                      if(address)
                            {details.AddressDetails = address;}
                       
                        }).catch((error: Error) => {
                                return res.status(500).json({ error: error });
                              }); 
                              
                              
                if(flag != 2)  {
                        return res.status(200).json(details);
                }  
                else{
                    return res.status(404).json("No Service of given Id");
                }
                
                }
            });
        }
        else {
            return res.status(400).json("Error occurred  header Not set properly!");
        }
    };


    public CancelService = async (req: Request, res: Response): Promise<Response> => {
        return this.Service
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
    
      public CompleteService = async (req: Request, res: Response): Promise<Response> => {
        return this.Service
          .CompleteService(+req.params.ServiceId)
          .then((ServiceRequest) => {
              return res.status(200).json("Service Status Recorded as Completed!");
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      };
    

    
}