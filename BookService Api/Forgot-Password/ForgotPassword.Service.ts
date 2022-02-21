import { User } from "../models/user";
import { ForgotPasswordRepository } from "./ForgotPassword.Repository";
import nodemailer from "nodemailer";
require("dotenv").config();



export class ForgotPasswordService {
  public constructor(private readonly ForgotPasswordRepository:ForgotPasswordRepository) {
    this.ForgotPasswordRepository = ForgotPasswordRepository;
}
  public async getUserByEmail(userEmail:string){
    return this.ForgotPasswordRepository.getUsersByEmail(userEmail);
  }
  public async UpdateUser(Password: string ,userEmail:string) {
    return this.ForgotPasswordRepository.UpdateUser(Password ,userEmail);
  }

 
public async sendResetMail(userEmail:string) {
  let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_ID,
        pass: process.env.EMAIL_PASS
    }
});
  
let mailDetails = {
    from: process.env.EMAIL_ID,
    to: userEmail,
    subject: 'Change password mail',
    text: 'Reset Password link.',
    html:'<a href="http://localhost:3000/ResetPassword">Click Here </a>'
};
  
mailTransporter.sendMail(mailDetails, function(err, data) {
    if(err) {
      
      return false;
    }
    else
    return true;
});

}

}