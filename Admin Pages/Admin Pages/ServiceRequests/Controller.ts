import { Request, Response, NextFunction } from "express";
import { ServiceRequest } from "../../models/servicerequest";
import { Service } from "./Service";
import jwt from "jsonwebtoken";
import exceljs from 'exceljs';
import { User } from "../../models/user";
require('dotenv').config();

export class Controller {
    public constructor(private readonly Service: Service) {
        this.Service = Service;
    }

    
    
    public getAllServiceRequest = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        
        let flag:number=0;
        let uId:any;
        let srId:any;
        let serviceList: any =[];
        let details:any = {};
        let response:any = [];

         if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    let admin=0;
                   await this.Service.IsAdmin(user.Email).then((user)=>{
                    if(user){
                        admin = 1;
                    }                              
                   }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });  
                  
                  await this.Service.getAllRequestIds().then((service)=>{
                    if(service){
                        serviceList = service;
                    }
                    else{
                        flag=2;
                    }
                }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });  


                for(let a in serviceList){
                    
                    await this.Service.getServiceDetailsById(serviceList[a].ServiceId).then((service) =>{
                        if(service){
                          uId= service?.UserId;
                          srId = service?.ServiceRequestId; 
                        }                 
                      }).catch((error: Error) => {
                          return res.status(500).json({ error: error });
                        });

                        await this.Service.getRequestDetails(serviceList[a].ServiceId).then((service) =>{
                            if(service){
                                details.ServiceDetails = service;
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
                                        
                 response.push(details);               
                                  
                } 
                           
                 if(admin == 1){
                    if(flag != 2)  {
                        return res.status(200).json(response);
                    }  
                    else{
                        return res.status(404).json("No Service History");
                    }
                 } 
                 else{
                     return res.status(500).json("ERROR UNKOWN USER POSING AS ADMIN...")
                 }            
                                         
                 }
                
            });
        }
        else {
            return res.status(400).json("Error occurred  header Not set properly!");
        }
    };


    public EditOrRescheduleService = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        let serviceDetails:any;
        let ServiceStatusFlag = 0;
        let spId:any;
        let serviceList:any;
        let notfound = 0;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {

                    let admin=0;
                    await this.Service.IsAdmin(user.Email).then((user)=>{
                     if(user){
                         admin = 1;
                     }                              
                    }).catch((error: Error) => {
                     return res.status(500).json({ error: error });
                   }); 
                    
                    await this.Service.getServiceDetailsById(+req.params.ServiceId).then((service)=>{
                        if(service){
                            ServiceStatusFlag= Number(service.Status);
                            spId=service.ServiceProviderId;
                            serviceDetails=service;
                            serviceDetails.TotalHours=service.ExtraHours! + service.ServiceHours;
                        }else{
                            notfound =1;
                        }

                    }).catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });

                      if(ServiceStatusFlag == 1 || ServiceStatusFlag == 3){
                          //update details without checking sp availbility , send cut email,
                          let f=0,d=0;
                          await this.Service.editDetailofSR(req.body.ServiceStartDate,req.body.ServiceStartTime,serviceDetails.ServiceId).then((s)=>{
                            if(s){
                               f=1;
                            }  
                            }).catch((error: Error) => {
                                return res.status(500).json({ error: error });
                            });
                            await this.Service.updateAddress(serviceDetails.ServiceRequestId,req.body.SRAddress).then((s)=>{
                                if(s){
                                   d=1;
                                }  
                                }).catch((error: Error) => {
                                    return res.status(500).json({ error: error });
                                }); 
                             
                            if(f == 1 && d == 1){
                                return res.status(200).json('ServiceDetails Edited and email sent to customer');
                            } 
                            else{
                                return res.status(500).json('Could not update try again')
                            }   
                        
                      }
                      else if(ServiceStatusFlag == 2){
                          //check sp available, send mail to cust n sp;

                             
                     await this.Service.getAllRequestofSp(spId).then((service)=>{
                        if(service){
                            serviceList=service;
                        }

                    }).catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      }); 

                      const { srId, matched } = await this.Service.helperHasFutureSameDateAndTime( serviceDetails.ServiceStartDate, serviceList,  serviceDetails.TotalHours, serviceDetails.ServiceStartTime );
                                            if(matched) {
                                                return res.status(200).json(`Another Service Request of ServiceId #${srId} has already been assigned which has time overlap with service request. You can't pick this one!`);
                                            }
                                            else{
                                                let f=0,d=0;
                                                await this.Service.editDetailofSR(req.body.ServiceStartDate,req.body.ServiceStartTime,serviceDetails.ServiceId).then((s)=>{
                                                    if(s){
                                                       f=1;
                                                    }  
                                                    }).catch((error: Error) => {
                                                        return res.status(500).json({ error: error });
                                                    });
                                                    await this.Service.updateAddress(serviceDetails.ServiceRequestId,req.body.SRAddress).then((s)=>{
                                                        if(s){
                                                           d=1;
                                                        }  
                                                        }).catch((error: Error) => {
                                                            return res.status(500).json({ error: error });
                                                        }); 
                                                     
                                                    if(f == 1 || d == 1){
                                                        return res.status(200).json('ServiceDetails Edited and email sent to customer');
                                                    } 
                                                    else{
                                                        return res.status(500).json('Could not update try again')
                                                    }   
                                            }
                      }
                      else if(notfound == 1){
                          return res.status(404).json("No request of given id")
                      }
                      else{
                          return res.status(200).json("Service Request Already Completed");
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
}