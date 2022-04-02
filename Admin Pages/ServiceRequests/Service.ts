import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { SRAddress } from "../../models/servicerequestaddress";
import { Repository } from "./Repository";
import nodemailer from "nodemailer";

export class Service {
    public constructor(private readonly Repository: Repository) {
        this.Repository = Repository;
    }
    
    public async IsAdmin(Email: string): Promise<User | null> {
        return this.Repository.IsAdmin(Email);
    }
    public async getUser(id: number): Promise<User | null> {
      return this.Repository.getUser(id);
  }

    public async getUserByEmail(Email: string): Promise<User | null> {
      return this.Repository.getUserByEmail(Email);
  }
   public async getAllRequest(){
        return this.Repository.getAllRequest();
    }
    


    public async getServiceDetailsById(ServiceId: number) {
        return this.Repository.getServiceById(ServiceId);
    }    
    public async getAllRequestofSp(Id: number): Promise<ServiceRequest[]> {
      return this.Repository.getAllRequestofSp(Id);
      }
      public async editDetailofSR(ServiceStartDate: any,ServiceStartTime: any,ServiceId: number) {
        return this.Repository.editDetailofSR(ServiceStartDate,ServiceStartTime,ServiceId);
    }
    public async updateAddress(SRId: number,SRAddress: any ){
        
        return this.Repository.updateAddress(SRId,SRAddress);
        }
   

    public helperHasFutureSameDateAndTime(
        date: Date,
        serviceRequest: ServiceRequest[],
        acceptTotalHour: number,
        time: number
      ) {
        let srId;
        let matched = false;
        for (let sr in serviceRequest) {
          if (date == serviceRequest[sr].ServiceStartDate) {
            const acceptTime = time.toString().split(":");
            if (acceptTime[1] === "30") {
              acceptTime[1] = "0.5";
            }
            const acceptStartTime = parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);
    
            const availableTime = serviceRequest[sr].ServiceStartTime.toString().split(":");
            if (availableTime[1] === "30") {
              availableTime[1] = "0.5";
            }
            const availableStartTime = parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
            
            const availableTotalHour = Number(serviceRequest[sr].ServiceHours) + Number(serviceRequest[sr].ExtraHours!);
            const totalAcceptTime = Number(acceptStartTime) + Number(acceptTotalHour) + 1;
            const totalAvailableTime = Number(availableStartTime) + Number(availableTotalHour) + 1;
            
            console.log("availableStartTime"+availableStartTime);
            console.log("totalAcceptTime"+totalAcceptTime);
            console.log("acceptStartTime"+acceptStartTime);
            console.log("totalAvailableTime"+totalAvailableTime);;
            if (
              totalAcceptTime <=  availableStartTime ||
              acceptStartTime >= totalAvailableTime
            ) {
              matched = false;
            } else {
              srId = serviceRequest[sr].ServiceId;
              matched = true;
              break;
            }
          } else {
            
            matched = false;
          }
        }
        return {matched, srId};
      }
   

      

      public async CancelService(ServiceId: number) {
        return this.Repository.CancelService(ServiceId);
      }



    public async filter_feature_SR(Service:any , filters: any){

      let filter_Info;
      if(filters.ServiceId){
        filter_Info = Service.filter((x: { ServiceId: any; }) => {return x.ServiceId === filters.ServiceId
        });
      }

     if(filters.Status){
        if(filter_Info){filter_Info = filter_Info.filter((x: { Status: any; }) => {
            return x.Status === filters.Status
          });
        }else{
          filter_Info = Service.filter((x: { Status: any; }) => {return x.Status === filters.Status
          });
        }
      }

      if(filters.PostalCode){
        if(filter_Info){
          filter_Info = filter_Info.filter((x: { Zipcode: any; }) => 
          { return Number(x.Zipcode) === Number(filters.PostalCode) });
        }
        else{
          filter_Info = Service.filter((x: { Zipcode: any; }) =>
           {return Number(x.Zipcode ) === Number(filters.PostalCode) });
        }
      }

     if(filters.UserId){
        if(filter_Info){
          filter_Info = filter_Info.filter((x: { UserId: any; }) => {return x.UserId === filters.UserId
          });
        }else{
          filter_Info = Service.filter((x: { UserId: any; }) => {return x.UserId === filters.UserId
          });
        }
      }

      if(filters.ServiceProviderId){
        if(filter_Info){
          filter_Info = filter_Info.filter((x: { ServiceProviderId: any; }) => {return x.ServiceProviderId === filters.ServiceProviderId
          });
        }else{
          filter_Info = Service.filter((x: { ServiceProviderId: any; }) => {return x.ServiceProviderId === filters.ServiceProviderId
          });
        }
      }

      
      if(filters.FromDate){
        const fromDate = new Date(filters.FromDate);
        if(filter_Info){
          filter_Info = filter_Info.filter((x: { ServiceStartDate: string | number | Date; }) => {
            return new Date(x.ServiceStartDate) >= fromDate
          });
        }else{
          filter_Info = Service.filter((x: { ServiceStartDate: string | number | Date; }) =>
           {return new Date(x.ServiceStartDate) >= fromDate
          });
        }
      }

      if(filters.ToDate){
        const toDate = new Date(filters.ToDate);
        if(filter_Info){
          filter_Info = filter_Info.filter((x: { ServiceStartDate: string | number | Date; }) => {return new Date(x.ServiceStartDate) <= toDate
          });
        }else{
          filter_Info = Service.filter((x: { ServiceStartDate: string | number | Date; }) => {return new Date(x.ServiceStartDate) <= toDate
          });
        }
      }

      if(filters.Email){
        const us = await this.Repository.getUserByEmail(filters.Email);
        if(us){
          if(filter_Info){
            filter_Info = filter_Info.filter((x: { UserRequest: { id: any; }; ServiceProviderId: any; }) => {
              return x.UserRequest.id === us.id || x.ServiceProviderId === us.id
            });
          }else{
            filter_Info = Service.filter((x: { UserRequest: { id: any; }; ServiceProviderId: any; }) => {
               return x.UserRequest.id === us.id || x.ServiceProviderId === us.id
            });
          }
        }else{
          filter_Info = [];
        }
      }
      
      if(filters.HasIssues){
        console.log(Service);
        if(filter_Info){
          filter_Info = filter_Info.filter((x: { HasIssues: any; }) => {
            return x.HasIssues === filters.HasIssues
          });
        }else{
          filter_Info = Service.filter((x: { HasIssues: any; }) => {
            return x.HasIssues === filters.HasIssues
          });
        }
        
      }
      
      return filter_Info;

    }


    public async SendSRMail(UserId: number,details: any,b: any){ 
      let flag:any;
      let User: any = await this.getUser(UserId);
         
         let  Email = User.Email;
          let mailTransporter = nodemailer.createTransport({
              service: 'gmail',
              auth: {
                  user: process.env.EMAIL_ID,
                  pass: process.env.EMAIL_PASS
              }
          });
            if(b.SRAddress){
              let mailDetails = {
                from: process.env.EMAIL_ID,
                to: Email,
                subject: details.Subject,
                html:`<html>
                <body>
                <h1>${details.Header}</h1>
                </br>
                <h2>${details.Message}</h2>
                </br>
                <h3>Service Details</h3>
                </br>
                <p>ServiceId- ${b.ServiceId}</p>
                </br>
                <p>Service Date- ${b.ServiceStartDate}</p>
                </br>
                <p>Service Time- ${b.ServiceStartTime}</p>
                </br>
                <h3>New Address is</h3>
                </br>
                <p>Street: ${b.SRAddress.StreetName}</p>
                </br>
                <p>House Number: ${b.SRAddress.HouseName}</p>
                </br>
                <p>City: ${b.SRAddress.City}</p>
                </br>
                <p>Postal Code: ${b.SRAddress.PostalCode}</p>
                </body></html>`
            };
              
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                  
                 return flag = false;
                }
                else
                return flag= true;
            });
            }else{
              let mailDetails = {
                from: process.env.EMAIL_ID,
                to: Email,
                subject: details.Subject,
                html:`<html>
                <body>
                <h1>${details.Header}</h1>
                </br>
                <h2>${details.Message}</h2>
                </br>
                <h3>Service Details<h3>
                </br>
                <p>ServiceId- ${b.ServiceId}</p>
                </br>
                <p>Service Date- ${b.ServiceStartDate}</p>
                </br>
                <p>Service Time- ${b.ServiceStartTime}</p>
                </body></html>`
            };
              
            mailTransporter.sendMail(mailDetails, function(err, data) {
                if(err) {
                  
                 return flag = false;
                }
                else
                return flag= true;
            });
            }
          
        }
}