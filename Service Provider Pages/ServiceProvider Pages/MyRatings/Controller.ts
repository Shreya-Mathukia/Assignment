import { Request, Response, NextFunction } from "express";
import { Service } from "./Service";
import jwt from "jsonwebtoken";
require('dotenv').config();

export class Controller {
    public constructor(private readonly Service: Service) {
        this.Service = Service;
    }

    public getratings = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        let spId: any;
        let flag:number=0;
        let uId:any;
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
                   details.serviceDate = serviceList[a].ServiceStartDate;
                   details.serviceStartTime = serviceList[a].ServiceStartTime;
                    await this.Service.getRatingsById(serviceList[a].ServiceRequestId).then((rating)=>{
                        if(rating){
                            uId = Number(rating.RatingFrom);
                            details.ratings = rating;
                        }
                    }).catch((error: Error) => {
                        return res.status(500).json({ error: error });
                      });
                        
                  await this.Service.getUserDetails(uId).then((user) =>{
                       if(user){details.UserDetails = user;}
                         
                        
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
}