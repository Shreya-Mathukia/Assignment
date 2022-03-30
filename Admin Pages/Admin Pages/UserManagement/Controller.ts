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

    
    
    public getAllUsers = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
         if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    let admin=0;
                   await this.Service.isAdmin(user.Email).then((user)=>{
                    if(user){
                        admin = 1;
                    }                              
                   }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });  
                  

                let resList:any  = [];
       
                   await this.Service.getAllUsers().then((user: User[] | null )=>{                
                     if(user){
                         for(let a in user){
                            resList.push(user[a]);
                         }
                        
                         }
                            
                      }).catch((error: Error) => {
                                return res.status(500).json({ error: error });
                               });  

                if(admin == 1){               
                  return res.status(200).json(resList);
                }
                else{
                    return res.json("ERROR!!!! NOT ADMIN ")
                }                       
                     
                   
               }
                
            });
        }
        else {
            return res.status(400).json("Error occurred  header Not set properly!");
        }
    };

    public EditUserStatus = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
         if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    let admin=0;
                    let userdetails:any= null;
                   await this.Service.isAdmin(user.Email).then((user)=>{
                    if(user){
                        admin = 1;
                    }                              
                   }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });  
                  
                  await this.Service.getUserDetailById(+req.params.id).then((user)=>{
                      if(user){
                        userdetails = user;
                      }
                  }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  }); 
                

                if(admin == 1){    
                    if(userdetails != null)  {
                        if(userdetails.IsActive){
                            return this.Service.DeactivateUser(+req.params.id).then((status)=>{
                                if(status){
                                  return res.json("User Account Deactivated");
                                }
                            }).catch((error: Error) => {
                              return res.status(500).json({ error: error });
                            }); 
                        }
                        else{
                            return this.Service.activateUser(+req.params.id).then((status)=>{
                                if(status){
                                  return res.json("User Account Activated");
                                }
                            }).catch((error: Error) => {
                              return res.status(500).json({ error: error });
                            }); 
                        }
                    }    
                    else{
                        return res.status(404).json("No user of given Id.")
                    }     
                  
                }
                else{
                    return res.json("ERROR!!!! NOT ADMIN ")
                }                       
                     
                   
               }
                
            });
        }
        else {
            return res.status(400).json("Error occurred  header Not set properly!");
        }
    };

    public ApproveHelperAccount = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
         if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    let admin=0;
                    let userdetails:any= null;
                   await this.Service.isAdmin(user.Email).then((user)=>{
                    if(user){
                        admin = 1;
                    }                              
                   }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });  
                  
                  await this.Service.getSpById(+req.params.id).then((user)=>{
                      if(user){
                        userdetails = user;
                      }
                  }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  }); 
                

                if(admin == 1){    
                    if(userdetails != null)  {
                        return this.Service.ApproveHelperAccount(+req.params.id).then((user)=>{
                            if(user){
                              return res.status(500).json("Service Provider Account Approved");
                            }
                        }).catch((error: Error) => {
                          return res.status(500).json({ error: error });
                        }); 
                    }    
                    else{
                        return res.status(404).json("No user of given Id.")
                    }     
                  
                }
                else{
                    return res.json("ERROR!!!! NOT ADMIN ")
                }                       
                     
                   
               }
                
            });
        }
        else {
            return res.status(400).json("Error occurred  header Not set properly!");
        }
    };


}