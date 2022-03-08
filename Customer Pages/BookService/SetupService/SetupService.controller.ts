import { Request, Response } from "express";
import { ServiceService } from "./SetUpService.service";
import jwt from "jsonwebtoken";
require("dotenv").config();

export class ServiceController {
    public constructor(private readonly serviceService: ServiceService) {
        this.serviceService = serviceService;
    }

    public setService = async (req: Request, res: Response): Promise<Response | void> => {
        const Zipcode:string = req.body.Zipcode;
            
        if(!Zipcode) {
            return res.status(403).json("Couldn't process request. Please provide Zipcode");
        }

        else {
            return this.serviceService
              .getSP()
              .then((sp) => {
        
                  let doMatch=false;
                  if(!sp) {
                    return res.status(404).json("There is no helper found!");
                  }
                  else {
                    for(let zc in sp){
                         
                        if( Number(Zipcode) === Number(sp[zc].Zipcode) ){
                                
                            doMatch =true;
                        }
                    }
                    if(!doMatch) {
                      return res.status(404).json("We are not providing service in this area. ");
                    }
                    else {
                      jwt.verify(req.headers.authorization!,process.env.SECRET_KEY!, (err, helper:any) => {
                          if(err) {
                              return res.status(400).json("Invalid or expired token!");
                          }
                          else{
                              const Email = helper.Email;
                              const Zipcode = req.body.Zipcode;
                              const token = this.serviceService.generateToken(Email, Zipcode);
                              return res.status(200).cookie("token", token, {httpOnly: true}).json("We are providing service in your area.");
                          }
                      }); 
                    }
                  }
                })
                .catch((error: Error) => {
                    console.log(error);
                    return res.status(500).json({ error });
                });
        }
    };

}