import { NextFunction, Request, Response } from "express";
import { SRAddress } from "../../../models/servicerequestaddress";
import { ServiceAddressService } from "./AddAdress.Service";
import jwt from "jsonwebtoken";
require("dotenv").config();

export class ServiceAddressController {
    public constructor(private readonly addressService: ServiceAddressService) {
        this.addressService = addressService;
    }
    
    public CreateServiceAddress = async(req: Request, res: Response, next: NextFunction) => {
        if(req.headers.authorization) {
            jwt.verify(req.headers.authorization, process.env.SECRET_KEY!, (error, address: any) => {
               if(error) {
                return res.status(400).json("Invalid login!")
               } 
               else {
                req.body.Email = address.Email;
                req.body.PostalCode = address.Zipcode;
                req.body.ServiceRequestId= address.ServiceRequestId
                return this.addressService
                  .findServiceRequestById(address.ServiceRequestId)
                  .then((ServiceRequest) => {
                      if(!ServiceRequest) {
                        return res.status(404).json("Restart Book Service Procedure!");
                      }
                      else {
                          let success =false;
                          return this.addressService
                            .CreateServiceAddress(req.body)
                            .then((address: SRAddress) => {
                                if(address){
                                     success= true;
                                       }

                                    if(success == true ){
                                        console.log(success);
                                        return this.addressService
                                        .getSP()
                                        .then((sp) => {                  
                                            for(let email in sp) {
                                              const serviceRequest = this.addressService.SendSRMail(sp[email].Email!).then((a: any)=>
                                             {
                                                  return res.status(200).cookie("token",{httpOnly: true}).json("Book Service Succesfull , Notified Service Providers Near You");
                                            }).catch((error: Error) => {
                                                return res.status(500).json({
                                                  error: error
                                                });
                                              });
                                              
                                            }
                                        }
                                        
                                        )
                                        .catch((error: Error) => {
                                          return res.status(500).json({ error });
                                        });
                                    }
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
            return res.status(400).json("No token exists!");
        }
    }
    
}