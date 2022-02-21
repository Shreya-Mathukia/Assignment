import { Request, Response } from "express";
import { UserAddress } from "../../models/useraddress";
import { UserAddressService } from "./address.service";
import jwt from "jsonwebtoken";
require("dotenv").config();

export class UserAddressController {
    public constructor(private readonly addressService: UserAddressService) {
        this.addressService = addressService;
    }
    
    public UserAddress = async(req: Request, res: Response) => {
        if(req.headers.authorization) {
            jwt.verify(req.headers.authorization, process.env.SECRET_KEY!, (error, user: any) => {
               if(error) {
                return res.status(400).json("Invalid login!")
               } 
               else {
                req.body.Email = user.Email;
                req.body.PostalCode = user.Zipcode;
                return this.addressService
                  .findUserByEmail(user.Email)
                  .then((user) => {
                      if(!user) {
                        return res.status(404).json("There is no user found with this email address!");
                      }
                      else {
                          return this.addressService
                            .UserAddress(req.body)
                            .then((address: UserAddress) => {
                                address.UserId = user.id;
                                return res.status(200).json({ address });
                            })
                            .catch((error: Error) => {
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
            return res.status(400).json("No token exists!");
        }
    };

    public getAddresses = async(req: Request, res: Response): Promise<Response | undefined> => {
        let userAddress: UserAddress[] = [];
        if(req.headers.authorization) {
            jwt.verify(req.headers.authorization, process.env.SECRET_KEY!, (error, user:any) => {
                if(error) {
                    return res.status(400).json("Invalid login!");
                }
                else {
                    return this.addressService
                      .findUserByEmail(user.Email)
                      .then((findUser) => {
                          if(!findUser) {
                            return res.status(404).json("There is no user found with this email address!");
                          }
                          else {
                              return this.addressService
                                .getAddresses(findUser.Email)
                                .then((address) => {
                                    if(address.length > 0) {
                                        for(let a in address) {
                                            if(address[a].PostalCode === user.ZipCode) {
                                                address[a].UserId = findUser.id;
                                                userAddress.push(address[a]);
                                            }
                                        }
                                        if(userAddress.length > 0) {
                                            return res.status(200).json(userAddress);
                                        }
                                        else{
                                            return res.status(404).json("There is no address!");
                                        }
                                    }
                                    else {
                                        return res.status(404).json("User Address not found!");
                                    }
                                })
                                .catch((error: Error) => {
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
            return res.status(400).json("No token exists!");
        }
    };
}