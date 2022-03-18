import { Request, Response, NextFunction } from "express";
import { Service } from "./Service";
import jwt from "jsonwebtoken";
require('dotenv').config();

export class Controller {
    public constructor(private readonly Service: Service) {
        this.Service = Service;
    }

    public getAllCustomers = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                let spId:any;
                let customerIdList:any =[];    
                let answer:any = [];    
                let flag = 1;    
               await this.Service.findUser(user.Email).then((user)=>{
                if(user){
                    spId = user.id;
                }
               }).catch((error: Error) => {
                return res.status(500).json({ error: error });
              });

              await this.Service.getAllRequest(spId).then((uIdarray)=>{
                if(uIdarray){
                    customerIdList = uIdarray;
                }else{
                    flag = 0;
                }
              }).catch((error: Error) => {
                return res.status(500).json({ error: error });
              });
    
               for( let a in customerIdList){
                   await this.Service.getUserDetails(customerIdList[a].UserId).then((user)=>{
                       if(user){
                        answer.push(user);
                       }
                   }).catch((error: Error) => {
                    return res.status(500).json({ error: error });
                  });
               }
 

               if(flag == 1){
                   return res.status(200).json(answer);
               }
               else{
                   return res.status(404).json("Not worked with anyone yet!")
               }
                
                }
            });
        }
        else {
            return res.status(400).json("Error occurred  header Not set properly!");
        }
    };


    public BlockCustomers = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                let spId:any;  
                let IsBlocked:any;   
                let flag =0; 
               await this.Service.findUser(user.Email).then((user)=>{
                if(user){
                    spId = user.id;
                }
               }).catch((error: Error) => {
                return res.status(500).json({ error: error });
              });

              await this.Service.check(spId, +req.params.TargetUserId).then((FnB)=>{
                  if(FnB){
                      flag =1;
                    IsBlocked= FnB.IsBlocked;
                  }
              }).catch((error: Error) => {
                return res.status(500).json({ error: error });
              });

              if(flag == 1){
                  
                if(IsBlocked == true){
                return res.status(200).json("Already in blocked list");
                }
                else {
                    return this.Service.UpdateBlockCustomer(spId,+req.params.TargetUserId).then((a)=>{
                        if(a){
                            return res.status(200).json("Added To Block List.")
                        }
                    }).catch((error: Error) => {
                return res.status(500).json({ error: error });
              });
                }
        }else{
            return this.Service.blockCustomer(spId,+req.params.TargetUserId).then((a)=>{
                if(a){
                    return res.status(200).json("Added To Block List.")
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


    public UnBlockCustomers = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, async (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                let spId:any;  
                let IsBlocked:any;   
                let flag =0; 
               await this.Service.findUser(user.Email).then((user)=>{
                if(user){
                    spId = user.id;
                }
               }).catch((error: Error) => {
                return res.status(500).json({ error: error });
              });

              await this.Service.check(spId, +req.params.TargetUserId).then((FnB)=>{
                  if(FnB){
                      flag =1;
                    IsBlocked= FnB.IsBlocked;
                  }
              }).catch((error: Error) => {
                return res.status(500).json({ error: error });
              });

              if(flag == 1){
                  
                if(IsBlocked == false){
                return res.status(200).json("Already  Unblocked");
                }
                else {
                    return this.Service.UnblockCustomer(spId,+req.params.TargetUserId).then((a)=>{
                        if(a){
                            return res.status(200).json("Added To Block List.")
                        }
                    }).catch((error: Error) => {
                return res.status(500).json({ error: error });
              });
                }
        }else{
           return res.status(200).json("This Customer Was never in Blocked List")
        }
              
              
                
                }
            });
        }
        else {
            return res.status(400).json("Error occurred  header Not set properly!");
        }
    };
    
}