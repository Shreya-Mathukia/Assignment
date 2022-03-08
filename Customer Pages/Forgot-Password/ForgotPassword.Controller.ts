import { Request, Response } from 'express';
import { ForgotPasswordService } from './ForgotPassword.Service';
import bcryptjs from "bcryptjs";
import { string } from 'joi';
require("dotenv").config();

export class ForgotPasswordController { 

  public constructor(private readonly ForgotPasswordService: ForgotPasswordService) {
    this.ForgotPasswordService = ForgotPasswordService;
  }

    public ForgotPassword = async (req: Request, res: Response) => {
     return  this.ForgotPasswordService.getUserByEmail(req.body.Email).then((user: any) => {
      if(user === null){
        return res.status(500).json("Invalid mail, Try agian or creating an account first.")
      }
      else{
        return this.ForgotPasswordService.sendResetMail(req.body.Email).then((a: any)=> {
          if(true){  return res.status(200).cookie("userEmail",req.body.Email).json("Check your mail");}
        }).catch((error: Error) => {
          return res.status(500).json({
            error: error
          });
        });
      }
      }).catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
    }


public ResetPassword =async (req:Request, res: Response) => {
  const Password = req.body.Password;
  let Mail:any = req.headers.cookie?.split(`=`)
  let Email = String(Mail[1]);
  let userEmail= Email.replace("%40","@");
  console.log(userEmail);
    bcryptjs.hash(Password,10,(err,hash) => {
    if (err) { 
        console.log('hashing error');
    }
    else
     return this.ForgotPasswordService.UpdateUser(hash,userEmail).then((user: any)=>{
       if(user)
       return res.clearCookie("userEmail").status(200).json("password updated");
       }).catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
      
    }); 
  
  }

} 


