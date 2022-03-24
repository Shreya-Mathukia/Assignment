import { Request, Response, NextFunction } from "express";
import { ServiceRequest } from "../../models/servicerequest";
import { Service } from "./Service";
import jwt from "jsonwebtoken";
import exceljs from 'exceljs';
require('dotenv').config();

export class Controller {
    public constructor(private readonly Service: Service) {
        this.Service = Service;
    }

    
    public getNewServiceRequest = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        let spId: any;
        let flag:number=0;
        let uId:any;
        let srId:any;
        let serviceList: any =[];
        let details:any = {};
        let response:any = [];
        let userZip:any, Spzip:any;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {

                await this.Service.findUser(user.Email).then((user: any) => {
                    if(user){
                        spId= user.id;
                        Spzip= user.Zipcode;
                    }
                }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });
                
                  
                await this.Service.getAllRequest().then((service)=>{
                    if(service){
                        serviceList = service;
                        console.log(service);
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
                         details.ServiceDetails = service;
                        }                 
                      }).catch((error: Error) => {
                          return res.status(500).json({ error: error });
                        });
                        
                  await this.Service.getUserDetails(uId).then((user) =>{
                       if(user){
                           details.UserDetails = user;
                           userZip = user.Zipcode;
                        }
                         
                        
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
                           
                              
                              
                if(flag != 2)  {
                        return res.status(200).json(response);
                }  
                else{
                    return res.status(404).json("No Service History");
                }
                
                }
            });
        }
        else {
            return res.status(400).json("Error occurred  header Not set properly!");
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

                await this.Service.getServiceDetailsById1(+req.params.ServiceId).then((service) =>{
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

    public AcceptServiceRequest = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        let serviceDetails:any;
        let spId:any;
        let serviceList:any;
        let userZip:any , SpZip:any;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {

                    await this.Service.findUser(user.Email).then((user)=>{
                        if(user){
                            spId = user.id;
                            SpZip = user.Zipcode;
                        }
                       }).catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                    
                    await this.Service.getServiceDetailsById1(+req.params.ServiceId).then((service)=>{
                        if(service){
                            serviceDetails=service;
                            serviceDetails.TotalHours=service.ExtraHours! + service.ServiceHours;
                        }

                    }).catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                        
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
                                                return this.Service.acceptService(spId,+req.params.ServiceId).then((a)=>{
                                                    if(a){
                                                        return res.status(200).json("Service Request Accepted");
                                                    }
                                                }).catch((error: Error) => {
                                                    return res.status(500).json({ error: error });
                                                  });
                                            }
                }
            });
        }
        else {
            return res.status(400).json("Error occurred  header Not set properly!");
        }
    };

   

    
}