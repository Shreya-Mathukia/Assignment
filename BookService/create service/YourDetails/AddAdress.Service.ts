import { ServiceRequest } from "../../../models/servicerequest";
import { SRAddress } from "../../../models/servicerequestaddress";
import { User } from "../../../models/user"
import { ServiceAddressRepository } from "./AddAddress.Repository";
import nodemailer from "nodemailer";

export class ServiceAddressService {
    public constructor(private readonly ServiceAddressRepository: ServiceAddressRepository) {
        this.ServiceAddressRepository = ServiceAddressRepository;
    }

    public async CreateServiceAddress(address: SRAddress): Promise<SRAddress> {
        return this.ServiceAddressRepository.CreateServiceAddress(address);
    }

    public async findServiceRequestById(ServiceRequestId: number): Promise<ServiceRequest | null> {
        return this.ServiceAddressRepository.findServiceRequestById(ServiceRequestId);
    }

    public async getSP(): Promise<User[]> {
        return this.ServiceAddressRepository.getSP();
    }
    public async blockCustomerCheck(SpId: number,Uid: number){
        return this.ServiceAddressRepository.blockCustomerCheck(SpId,Uid);
    }
    


    public async SendSRMail(sp: User[]){ 
        let flag:any;
        for(let a in sp){
           
           let  Email = sp[a].Email;
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
                <p>Check out the New  Service Request.</p>
                </body></html>`
            };
              
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                  
                  flag = false;
                }
                else
                flag= true;
            });
        }      
        if(flag == false) {
                  
            return false;
          }
          else
          return true; 
        
        
        }

}

