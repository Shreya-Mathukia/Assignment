import { Request, Response } from "express";   
import { ProfileService } from "./Service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";  
import { UserAddress } from "../../models/useraddress";

require('dotenv').config();
const saltRouds: number = 10;

export class ProfileController {
    public constructor(private readonly ProfileService: ProfileService) {
        this.ProfileService = ProfileService ;
    }

    public MyDetails = async (req: Request, res: Response): Promise<Response | void> => {

            jwt.verify(req.headers.authorization!, process.env.SECRET_KEY!, (error, user:any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                } 
                else {
                    const LogedInEmail = user.Email;
                    if(LogedInEmail) {
                        return this.ProfileService
                          .findUserByEmail(LogedInEmail)
                          .then((findUser) => {
                            if(findUser) {
                                if(req.body.Email){
                                    return this.ProfileService
                                  .MyDetails( req.body ,LogedInEmail)
                                  .then((user: any) => {
                                        res.clearCookie('token');
                                        return res.status(200).json({Message: "Details Saved ,Changed Your Email Now proceed to login again ." , MyDetails: req.body});
                                  })
                                  .catch((error: Error) => {
                                      return res.status(500).json({ error: error });
                                  });
                                }
                                else{
                                    req.body.Email = LogedInEmail;
                                    return this.ProfileService
                                  .MyDetails( req.body ,LogedInEmail)
                                  .then((user: any) => {
                                        return res.status(200).json({Message: "Details Saved" , MyDetails: req.body});
                                  })
                                  .catch((error: Error) => {
                                      return res.status(500).json({ error: error });
                                  });
                                }
                                
                            }
                            else {
                                return res.status(404).json("No user found with this email!");
                            }
                          })
                          .catch((error: Error) => {
                              return res.status(500).json({ error: error });
                          });
                    }
                    else {
                        return res.status(404).json("No email found!");
                    }
                }
            });
        
    };



    public HelperAddress = async(req: Request, res: Response) => {
        if(req.headers.authorization) {
            let flag:number;
            let adId:any;
            jwt.verify(req.headers.authorization, process.env.SECRET_KEY!, async (error, user: any) => {
               if(error) {
                return res.status(400).json("Invalid login!")
               } 
               else {
                req.body.Email = user.Email;
                await this.ProfileService.findUserByEmail(user.Email).then(async (user) => {
                      if(user) {
                        req.body.Mobile = user.Mobile;
                        req.body.UserId = user.id;
                        
                      }
                    
                }).catch((error: Error) => {
                  return res.status(500).json({ error });
                });
                         
                await  this.ProfileService.findByAddressId(req.body.UserId).then((address)=>
                          {
                         if(address){
                                  flag= 1; 
                                  adId = address.AddressId;                              
                              }
                              else{
                                  flag = 0;
                              }
                          }).catch((error: Error) => {
                                console.log(error);
                                return res.status(500).json({ error });
                            });

                        
                if( flag == 1){
                                
                    return this.ProfileService.updateUserAddress( adId, req.body ).then((address: any) => {
                                                    return res.status(200).json({
                                                        Address: address.AddressLine1 + ', ' + address.AddressLine2 + ', ' + address.City  + ', ' + address.PostalCode,
                                                        Message: "Address Updated!"
                                                    });
                                                })
                                                .catch((error: Error) => {
                                                    return res.status(500).json({ error: error });
                                                });
                            }
                            
               else {
                        return this.ProfileService.CreateUserAddress(req.body).then((address: UserAddress) => {
                                    return res.status(201).json({
                                        Address: address.AddressLine1 + ', ' + address.AddressLine2 + ', ' + address.City + ', ' + address.PostalCode,
                                        Message: "Address Details Added!"
                                    });
                                })
                                .catch((error: Error) => {
                                    console.log(error);
                                    return res.status(500).json({ error });
                                });
                            }
                          
                  
                }
            });
        }
        else {
            return res.status(400).json("No token exists!");
        }
    };

    

    public changePassword = async(req: Request, res: Response): Promise<Response | void> => {
        
            jwt.verify(req.headers.authorization!, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    return this.ProfileService
                          .findUserByEmail(user.Email)
                          .then(async (findUser) => {
                              if(findUser) {
                                  console.log("ok");
                                  const isOld = bcrypt.compare(req.body.OldPassword, findUser.Password).then(async (domatch)=>{
                                    if(domatch){
                                        if(req.body.OldPassword === req.body.NewPassword) {
                                            return res.status(400).json("New Password Can't be same as old Password!");
                                        } 
                                        else{
                                 req.body.NewPassword = await bcrypt.hash(req.body.NewPassword, saltRouds);
                                  return this.ProfileService
                                    .changePassword(user.Email, req.body.NewPassword)
                                    .then(async (user) => {
                                        return res.status(200).status(200).json("Password changed Successfully!");     
                                    })
                                    .catch((error: Error) => {
                                        console.log(error);
                                        return res.status(500).json({ error: error });
                                    });
                                        } 
                                    }
                                    else {
                                        return res.status(401).json("Incorrect Old Password!");
                                      }

                                  }).catch((error: Error) => {
                                    console.log(error);
                                    return res.status(500).json({ error: error });
                                });      
                                  
                              }
                              else {
                                  return res.status(404).json("User not exist!");
                              }
                          })
                          .catch((error: Error) => {
                            console.log(error);
                            return res.status(500).json({ error: error });
                        });
                }
            });
       
    };

}