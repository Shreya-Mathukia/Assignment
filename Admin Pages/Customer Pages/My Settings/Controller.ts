import { Request, Response } from "express";
import { User } from "../../models/user";
import { MySettingsService } from "./Service";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { UserAddress } from "../../models/useraddress";

require('dotenv').config();
const saltRouds: number = 10;

export class MySettingsController {
    public constructor(private readonly MySettingsService: MySettingsService) {
        this.MySettingsService = MySettingsService;
    }

    public MyDetails = async (req: Request, res: Response): Promise<Response | void> => {

            jwt.verify(req.headers.authorization!, process.env.SECRET_KEY!, (error, user:any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                } 
                else {
                    const Email = user.Email;
                    req.body.Email= user.Email;
                    if(Email) {
                        return this.MySettingsService
                          .findUserByEmail(Email)
                          .then((findUser) => {
                            if(findUser) {
                                return this.MySettingsService
                                  .MyDetails( req.body )
                                  .then((user: any) => {
                                        return res.status(200).json({Message: "Details Saved" , MyDetails: req.body});
                                  })
                                  .catch((error: Error) => {
                                      return res.status(500).json({ error: error });
                                  });
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

    public updateUserAddress = async(req: Request, res: Response): Promise<Response | void> => {
        const token = req.headers.authorization;

        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    const { Email } = user;
                    req.body.Email = user.Email;
                    if(Email) {
                        return this.MySettingsService
                          .findUserByEmail(Email)
                          .then((findUser) => {
                              if(findUser) {
                                  return this.MySettingsService
                                    .findByAddressId(+req.params.Id)
                                    .then((id) => {
                                        if(id) {
                                            if(findUser.Email === id.Email) {
                                                return this.MySettingsService
                                                .updateUserAddress( +req.params.Id, req.body )
                                                .then((address: any) => {
                                                    return res.status(200).json({
                                                        Address: address.AddressLine1 + ', ' + address.AddressLine2 + ', ' + address.City + ', ' + address.State + ', ' + address.PostalCode,
                                                        PhoneNumber: address.Mobile
                                                    });
                                                })
                                                .catch((error: Error) => {
                                                    return res.status(500).json({ error: error });
                                                });
                                            }
                                            else {
                                                return res.status(404).json("Enter valid Id!");
                                            }
                                        }
                                        else {
                                            return res.status(404).json("Id not found!");
                                        }
                                    })
                                    .catch((error: Error) => {
                                        return res.status(500).json({ error: error });
                                    });
                              }
                              else {
                                  return res.status(401).json("No user found with this email!");
                              }
                          })
                          .catch((error: Error) => {
                            return res.status(500).json({ error: error });
                        });
                    }
                    else {
                        return res.status(401).json("No email found!");
                    }
                }
            });
        }
        else {
            return res.status(500).json("Error");
        }
    };

    public CreateUserAddress = async(req: Request, res: Response) => {
        if(req.headers.authorization) {
            jwt.verify(req.headers.authorization, process.env.SECRET_KEY!, (error, user: any) => {
               if(error) {
                return res.status(400).json("Invalid login!")
               } 
               else {
                req.body.Email = user.Email;
                return this.MySettingsService
                  .findUserByEmail(user.Email)
                  .then((user) => {
                      if(!user) {
                        return res.status(404).json("There is no user found with this email address!");
                      }
                      else {
                          req.body.UserId = user.id;
                          return this.MySettingsService
                            .CreateUserAddress(req.body)
                            .then((address: UserAddress) => {
                                return res.status(200).json({
                                    Address: address.AddressLine1 + ', ' + address.AddressLine2 + ', ' + address.City + ', ' + address.State + ', ' + address.PostalCode,
                                    PhoneNumber: address.Mobile
                                });
                            })
                            .catch((error: Error) => {
                                console.log(error);
                                return res.status(500).json({ error });
                            });
                      }
                  })
                  .catch((error: Error) => {
                    return res.status(500).json({ error });
                  });
                }
            });
        }
        else {
            return res.status(401).json("No token exists!");
        }
    };

    public deleteAddress = async(req: Request, res: Response): Promise<Response | undefined> => {
        const token = req.headers.authorization;
        if(token) {
            jwt.verify(token, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid Login!");
                }
                else {
                    return this.MySettingsService
                      .findUserByEmail(user.Email)
                      .then((findUser) => {
                          if(findUser) {
                              return this.MySettingsService
                                .findByAddressId(+req.params.Id)
                                .then((id) => {
                                    if(id) {
                                        if(findUser.Email === id.Email) {
                                            return this.MySettingsService
                                            .deleteAddress(+req.params.Id)
                                            .then((address) => {
                                              return res.status(200).json("Address deleted Successfully!");
                                            })
                                            .catch((error: Error) => {
                                                return res.status(500).json({ error : error });
                                            });
                                        }
                                        else {
                                            return res.status(404).json("Enter valid Id");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("Id not found!");
                                    }
                                })
                                .catch((error: Error) => {
                                    return res.status(500).json({ error : error });
                                });
                          }
                          else {
                            return res.status(404).json("No user found with this email!");
                        }
                      })
                      .catch((error: Error) => {
                        return res.status(500).json({ error : error });
                    });
                }
            });
        }
        else {
            return res.status(400).json("ERROR!");
        }
    };

    public changePassword = async(req: Request, res: Response): Promise<Response | void> => {
        
            jwt.verify(req.headers.authorization!, process.env.SECRET_KEY!, (error, user: any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    return this.MySettingsService
                          .findUserByEmail(user.Email)
                          .then(async (findUser) => {
                              if(findUser) {
                                  console.log("ok");
                                  const isOld = bcrypt.compare(req.body.OldPassword, findUser.Password).then(async (domatch)=>{
                                    if(domatch){
                                        if(req.body.OldPassword === req.body.NewPassword) {
                                            return res.status(401).json("New Password Can't be same as old Password!");
                                        } 
                                        else{
                                 req.body.NewPassword = await bcrypt.hash(req.body.NewPassword, saltRouds);
                                  return this.MySettingsService
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
                                        return res.status(404).json("Incorrect Old Password!");
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