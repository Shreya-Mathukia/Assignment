import { Request, Response, NextFunction } from "express";
import { ServiceRequest } from "../../models/servicerequest";
import { HistoryService } from "./Service";
import jwt from "jsonwebtoken";
require('dotenv').config();

import exceljs from "exceljs";

export class HistoryController {
    public constructor(private readonly historyService: HistoryService) {
        this.historyService = historyService;
    }

    public history = async(req: Request, res: Response): Promise<Response | undefined> => {
        let serviceRequest: ServiceRequest[] = [];
        const token = req.headers.authorization;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    let ans:any =[];
                    return this.historyService
                      .findUser(user.Email)
                      .then((user: any) => {
                            return this.historyService
                            .getAllPastRequest(user.id)
                            .then((service: any) => {
                                if(service){
                                    for(let a in service){
                                        
                                        let q:any={};
                                        let user: any ={};
                                        let sr: any ={};
                                        
                                        
                                        sr.ServiceId=service[a].ServiceId;
                                        if(Number(service[a].Status)== 3){
                                            sr.Status = 'Canceled';
                                        }else{
                                            sr.Status = 'Completed';
                                        }                                        
                                        sr.ServiceStartDate=service[a].ServiceStartDate;
                                        sr.ServiceStartTime=service[a].ServiceStartTime;
                                        sr.Duration=service[a].ServiceHours;
                                        sr.ExtraHours=service[a].ExtraHours;
                                        sr.NetAmount=service[a].TotalCost;
                                        sr.Comments=service[a].Comments;
                                        q.ServiceDetails = sr;
                      
                                        let {HelperRequest}=service[a];                      
                                        if(HelperRequest != null){
                                            user.Name = HelperRequest.FirstName + " "+ HelperRequest.LastName;
                                            q.HelperDetails = user;
                          
                                        }
                                        else{
                                           q.HelperDetails= null;
                                        }
                                                                                             
                                          ans.push(q);
                                          
                                                                       
                                } 
                                    
                                     return res.status(200).json(ans);
                                   }
                                   else{
                                       return res.status(404).json("NO SERVICE History!")
                                   }
                                                 
                                  
                            })
                            .catch((error: Error) => {
                                console.log(error);
                                return res.status(500).json({ error: error });
                            });
                        
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("Error!");
        }
    };

    public getServiceById = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        let ans: any = [];
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    

                            return this.historyService
                            .getServiceById(+req.params.ServiceId)
                            .then((service: any) => {
                               
                                    if(service){
                                            
                                            let q:any={};
                                            let user: any ={};
                                            let sr: any ={};
                                            let address: any = {};
                                            
                                            sr.ServiceId = service.ServiceId;

                                            if(Number(service.Status)== 3){
                                                sr.Status = 'Canceled';
                                            }else{
                                                sr.Status = 'Completed';
                                            }  
                                            sr.ServiceStartDate=service.ServiceStartDate;
                                            sr.ServiceStartTime=service.ServiceStartTime;
                                            sr.Duration=service.ServiceHours;
                                            sr.ExtraHours=service.ExtraHours;
                                            sr.NetAmount=service.TotalCost;
                                            sr.Comments=service.Comments;
                                            q.ServiceDetails = sr;
                          
                                            let {HelperRequest,ServiceRequestAddress}=service;
                          
                                                                  
                                            if(HelperRequest != null){
                                                user.Name = HelperRequest.FirstName + " "+ HelperRequest.LastName;
                                                q.HelperDetails = user;
                            
                                            }
                                            else{
                                            q.HelperDetails= null;
                                            }

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
                                              
                                                                           
                                    
                                        
                                         return res.status(200).json(ans);
                                       }
                                    else {
                                        return res.status(404).json("No service request detail found with this service ID!");
                                    }
                                
                            })
                            .catch((error: Error) => {
                                console.log(error);
                              return res.status(500).json({ error: error });
                            });
                          

                }
            });
        }
        else {
            return res.status(400).json("Some error occurred!");
        }
    };

    public giveRatings = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization;
        req.body.RatingDate = new Date();

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    await this.historyService.getServiceById(+req.params.ServiceId).then( (service: any)=>{
                        req.body.ServiceRequestId = service.ServiceRequestId;
                    }).catch((error: Error) => {
                        return res.status(500).json({ error: error });
                    })
                             
                            return this.historyService
                              .getRatingsById(req.body.ServiceRequestId)
                              .then((rating) => {
                                  if(rating) {
                                      return res.status(201).json("You already gave Ratings!");
                                  }
                                  else {
                                      if(+req.params.ServiceId) {
                                          return this.historyService
                                            .getServiceById(+req.params.ServiceId)
                                            .then((service) => {
                                                if(service) {
                                                    req.body.ServiceRequestId = service.ServiceRequestId;
                                                     req.body.RatingFrom = service.UserId;
                                                        if(Number(service.Status) == 4) {
                                                            req.body.RatingFrom = service.UserId;
                                                            req.body.RatingTo = service.ServiceProviderId;
                                                            req.body.Ratings = this.historyService.getRatings(req.body);
                                                            return this.historyService
                                                              .giveRatings(req.body)
                                                              .then((ratings) => {
                                                                return res.status(200).json(ratings);
                                                              })
                                                              .catch((error: Error) => {
                                                                return res.status(500).json({ error: error });
                                                              });
                                                        }
                                                        else {
                                                            return res.status(401).json("Service Request not completed or ServiceProvider Not found!");
                                                        }
                                                    
                                                }
                                                else {
                                                    return res.status(404).json("No service exists!");
                                                }
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error: error });
                                            });
                                      }
                                      else {
                                          return res.status(404).json("Service Request  not exists!");
                                      }
                                  }
                              })
                              .catch((error: Error) => {
                                return res.status(500).json({ error: error });
                              });
                      
                }
            });
        }
        else {
            return res.status(400).json("ERROR");
        }
    }; 

    public export = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.historyService
                      .findUser(user.Email)
                      .then(async (user) => {
                          if(user) {
                              let data: ServiceRequest | any = await this.historyService.getAllPastRequest(user.id);
                              for(let a in data){
                                  if(Number(data[a].Status) == 3){
                                      data[a].Status = "Canceled";
                                  }
                                  else{
                                    data[a].Status = "Completed";
                                  }                                 
                                  
                              }
                              const workbook = new exceljs.Workbook();
                              const worksheet = workbook.addWorksheet('Service History');
                              worksheet.columns = [
                                {header: 'Id', key: 'Id', width: 10},
                                {header: 'ServiceId', key: 'ServiceId', width: 10},
                                {header: 'ServiceStartDate', key: 'ServiceStartDate', width: 20},
                                {header: 'ServiceStartTime', key: 'ServiceStartTime', width: 20},
                                {header: 'ServiceProviderId', key: 'ServiceProviderId', width: 20},
                                {header: 'NetAmmount', key: 'TotalCost', width: 10},
                                {header: 'Status', key: 'Status', width: 10},
                              ];
                              let count = 1;
                              data.forEach((d: any) => {
                                (d as any).Id = count;
                                worksheet.addRow(d);
                                count += 1;
                              });

                              worksheet.getRow(1).eachCell((cell) => {
                                cell.font = {bold: true};
                              });

                              workbook.xlsx.writeFile('ServiceHistory_' + user.FirstName+'-'+user.LastName + '.xlsx')
                              .then((service) => {
                                return res.status(200).json("Data exported successfully!");
                              })
                              .catch((error: Error) => {
                                  console.log(error);
                                return res.status(500).json({ error: error });
                              });
                          }
                      })
                      .catch((error: Error) => {
                        console.log(error);
                        return res.status(500).json({ error: error });
                      });
                }
            });
        }
        else {
            return res.status(400).json("ERROR!");
        }
    };
}