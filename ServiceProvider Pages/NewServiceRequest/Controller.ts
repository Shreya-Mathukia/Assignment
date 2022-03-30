import { Request, Response, NextFunction } from "express";
import { ServiceRequest } from "../../models/servicerequest";
import { Service } from "./Service";
import jwt from "jsonwebtoken";
import exceljs from 'exceljs';
import { any } from "joi";
require('dotenv').config();

export class Controller {
    public constructor(private readonly Service: Service) {
        this.Service = Service;
    }

    
    public getNewServiceRequest = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                
                let ans: any = [];           
                  
                return this.Service.getAllRequest().then((service: any)=>{                    
                        if(service){
                            for(let a in service){
                                let q:any={};
                                let user: any ={};
                                let sr: any ={};
                                let address: any = {};
                                
                                sr.ServiceId=service[a].ServiceId;
                                sr.ServiceStartDate=service[a].ServiceStartDate;
                                sr.ServiceStartTime=service[a].ServiceStartTime;
                                sr.Payment=service[a].TotalCost;
                                sr.ServiceHours=service[a].ServiceHours;
                                
                                q.ServiceDetails = sr;
   
                                let {UserRequest,ServiceRequestAddress}=service[a];
   
                                user.Name =  UserRequest.FirstName+" "+UserRequest.LastName;
                                q.UserDetails = user;
   
                                if(ServiceRequestAddress != null){
                                   address.StreetName = ServiceRequestAddress.AddressLine1;
                                   address.HouseNumber= ServiceRequestAddress.AddressLine2;
                                   address.PostalCode= ServiceRequestAddress.PostalCode;
                                   address.City = ServiceRequestAddress.City;
                                   q.UserDetails.AddressofSr= address;
                                }
                                else{
                                   q.UserDetails.AddressofSr= null;
                                }
                                                                                     
                                  ans.push(q);
                                  } 

                                  return res.status(200).json(ans);
                             
                           } 
                           else{
                            return res.status(404).json("NO SERVICE FOUND!")
                        }                          

                        }).catch((error: Error) => {
                            return res.status(500).json({ error: error });
                        });  

                
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

    public AcceptServiceRequest = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        let serviceDetails:any;
        let spId:any;
        let serviceList:any=[];
        let SrZip:any , SpZip:any;
       
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
                    
                    await this.Service.getServiceDetailsById(+req.params.ServiceId).then((service)=>{
                        if(service){
                            serviceDetails=service;
                            SrZip = service.Zipcode;
                            serviceDetails.TotalHours=service.ExtraHours! + service.ServiceHours;
                        }

                    }).catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                        
                     await this.Service.getAllRequestofSp(spId).then((service)=>{
                        let srId = +req.params.ServiceId ;
                        if(service){
                            for(let a in service){
                                if(service[a].ServiceId != srId ){
                                    serviceList.push(service[a]);
                                }
                            }
                            
                        }

                    }).catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      }); 

                      const { srId, matched } = await this.Service.helperHasFutureSameDateAndTime( serviceDetails.ServiceStartDate, serviceList,  serviceDetails.TotalHours, serviceDetails.ServiceStartTime );
                                            if(matched) {
                                                return res.status(200).json(`Another Service Request of ServiceId #${srId} has already been assigned which has time overlap with service request. You can't pick this one!`);
                                            }
                                            else{
                                                if(Number(SrZip) == Number(SpZip)){
                                                    return this.Service.acceptService(spId,+req.params.ServiceId).then((a)=>{
                                                        if(a){
                                                            return res.status(200).json("Service Request Accepted");
                                                        }
                                                    }).catch((error: Error) => {
                                                        return res.status(500).json({ error: error });
                                                      });

                                                }else{
                                                    return res.status(500).json("Cannot accept this request due to different areas.")
                                                }
                                                
                                            }
                }
            });
        }
        else {
            return res.status(400).json("Error occurred  header Not set properly!");
        }
    };

   

    
}