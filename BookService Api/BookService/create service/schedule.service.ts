import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { ScheduleRepository } from "./schedule.repository";
import nodemailer from "nodemailer";
require("dotenv").config();

export class ScheduleService {
    public constructor(private readonly scheduleRepository: ScheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public async findByZipCode(ZipCode: string): Promise<User | null> {
        return this.scheduleRepository.findByZipCode(ZipCode);
    }

    public async findByEmail(Email: string): Promise<User | null> {
        return this.scheduleRepository.findByEmail(Email);
    }

    public async scheduleService(ServiceRequest: {[key: number | string] : ServiceRequest}): Promise<ServiceRequest> {
        return this.scheduleRepository.scheduleService(ServiceRequest);
    }

    public async getSP(): Promise<User[]> {
        return this.scheduleRepository.getSP();
    }

    public async serviceRequest(Email: string){        
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ID,
            pass: process.env.EMAIL_PASS
        }
    });
      
    let mailDetails = {
        from: process.env.EMAIL_ID,
        to: Email,
        subject: 'New Service Request',
        html:`<html>
        <body>
        <h2>New Service Request Created!</h2>
        <p>Logged in to your account to accept Service Request.</p>
        </body></html>`
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