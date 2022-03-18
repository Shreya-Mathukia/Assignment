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

    
    public getServiceHistory = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        let spId: any;
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

                await this.Service.findUser(user.Email).then((user: any) => {
                    if(user){
                        spId= user.id;
                    }
                }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });
                
                  
                await this.Service.getAllRequest(spId).then((service)=>{
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

    public export = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.Service
                      .findUser(user.Email)
                      .then(async (user) => {
                          if(user) {
                              const data = await this.Service.getAllRequest(user.id);
                              const workbook = new exceljs.Workbook();
                              const worksheet = workbook.addWorksheet('Service History');
                              worksheet.columns = [
                                {header: 'Id', key: 'Id', width: 10},
                                {header: 'ServiceId', key: 'ServiceId', width: 10},
                                {header: 'ServiceStartDate', key: 'ServiceStartDate', width: 20},
                                {header: 'ServiceStartTime', key: 'ServiceStartTime', width: 20},
                                {header: 'ServiceProviderId', key: 'ServiceProviderId', width: 20},
                                {header: 'TotalCost', key: 'TotalCost', width: 10},
                                {header: 'Status', key: 'Status', width: 10}
                              ];
                              let count = 1;
                              data.forEach(d => {
                                (d as any).Id = count;
                                worksheet.addRow(d);
                                count += 1;
                              });

                              worksheet.getRow(1).eachCell((cell) => {
                                cell.font = {bold: true};
                              });

                              workbook.xlsx.writeFile('HelperServiceHistory_' + user.FirstName+'-'+user.LastName + '.xlsx')
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