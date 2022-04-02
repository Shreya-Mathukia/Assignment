import { Request, Response, NextFunction, RequestHandler } from "express";
import { Service } from "./Service";
import jwt from "jsonwebtoken";

require('dotenv').config();

export class Controller {
    public constructor(private readonly Service: Service) {
        this.Service = Service;
    }

    
    
    public getAllServiceRequest = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    let ans: any = [];
                       return this.Service.getAllRequest().then((service:any)=>{
                       
                           if(service){
                            for(let a in service){
                                
                                let q:any={};
                                let user: any ={};
                                let sr: any ={};
                                let address: any = {};
                                
                                sr.ServiceId=service[a].ServiceId;
                                sr.ServiceStartDate=service[a].ServiceStartDate;
                                sr.GrossAmount=service[a].Subtotal;
                                sr.NetAmount=service[a].TotalCost;
                                sr.Discount=service[a].Discount;
                                sr.Status=service[a].Status;
                                sr.PaymentDone=service[a].PaymentDone;
                                q.ServiceDetails = sr;
   
                                let {UserRequest,ServiceRequestAddress}=service[a];
   
                                
                                user.Name = UserRequest.FirstName + " "+ UserRequest.LastName;
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
                          console.log(error);
                        return res.status(500).json({ error: error });
                    });                   
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
        let serviceList:any = [];
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
                          let details={
                              Subject:"Rescheduled Service",
                              Header: "Reschedule Service by Admin ",
                              Message:"Your Service Request Rescheduled by Admin "
                          }
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
                                req.body.ServiceId= +req.params.ServiceId;
                                await this.Service.SendSRMail(serviceDetails.UserId,details,req.body);
                                return res.status(200).json('ServiceDetails Edited and email sent to customer');
                            } 
                            else{
                                return res.status(500).json('Could not update try again')
                            }   
                        
                      }
                      else if(ServiceStatusFlag == 2){
                        let details={
                            Subject:"Rescheduled Service",
                            Header: "Reschedule Service by Admin ",
                            Message:"Your Service Request Rescheduled by Admin "
                        }
                             
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

                      const { srId, matched } = await this.Service.helperHasFutureSameDateAndTime( req.body.ServiceStartDate, serviceList,  serviceDetails.TotalHours, req.body.ServiceStartTime );
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
                                                        req.body.ServiceId= +req.params.ServiceId;
                                                        await this.Service.SendSRMail(serviceDetails.UserId,details,req.body);
                                                       await this.Service.SendSRMail(serviceDetails.ServiceProviderId,details,req.body);
                                                        return res.status(200).json('ServiceDetails Edited and email sent to customer and SP');
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
                          return res.status(201).json("Service Request Already Completed");
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
          .then(async (ServiceRequest) => {
            
            let b: any =  await this.Service.getServiceDetailsById(+req.params.ServiceId);
            let details ={
                     Subject:"Your Service Request Cancelation",
                     Header:"Request Canceled Successfully",
                     Message: "SR has been Canceled by Admin as Per your request."
            }
            await this.Service.SendSRMail(b?.UserId,details,b);
            if(Number(b.Status) == 2){
                await this.Service.SendSRMail(b?.ServiceProviderId,details,b);   
            }
              return res.status(200).json("Service Canceled!");
          })
          .catch((error: Error) => {
            return res.status(500).json({
              error: error
            });
          });
      };

      public filter_SR: RequestHandler = async (req,res): Promise<Response> => {
        const filters = req.body;
        
          return this.Service.getAllRequest()
            .then(async (ser_Req) => {
              if (ser_Req && ser_Req.length > 0) {
                let ans:any =[];
                const service = await this.Service.filter_feature_SR(ser_Req,filters);
                for(let a in service){
                    
                    let q:any={};
                    let user: any ={};
                    let sr: any ={};
                    let address: any = {};
                    
                    sr.ServiceId=service[a].ServiceId;
                    sr.ServiceStartDate=service[a].ServiceStartDate;
                    sr.GrossAmount=service[a].Subtotal;
                    sr.NetAmount=service[a].TotalCost;
                    sr.Discount=service[a].Discount;
                    sr.Status=service[a].Status;
                    sr.PaymentDone=service[a].PaymentDone;
                    q.ServiceDetails = sr;

                    let {UserRequest,ServiceRequestAddress}=service[a];

                    user.FirstName =  UserRequest.FirstName;
                    user.LastName= UserRequest.LastName;
                    q.UserDetails = user;

                    if(ServiceRequestAddress != null){
                       address.StreetName = ServiceRequestAddress.AddressLine1;
                       address.HouseNumber= ServiceRequestAddress.AddressLine2;
                       address.PostalCode= ServiceRequestAddress.PostalCode;
                       address.City = ServiceRequestAddress.City;
                       q.AddressofSr= address;
                    }
                    else{
                       q.AddressofSr= null;
                    }
                                                                         
                      ans.push(q);
                      
                                                   
            } 
                return res.status(200).json(ans);
              } else {
                return res.status(404).json({ message: "No SR found" });
              }
            })
            .catch((error: Error) => {
              console.log(error);
              return res.status(500).json({ error: error });
            });
        
      };
      
}