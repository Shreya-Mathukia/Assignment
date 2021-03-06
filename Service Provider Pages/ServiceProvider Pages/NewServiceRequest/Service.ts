import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { SRAddress } from "../../models/servicerequestaddress";
import { Repository } from "./Repository";

export class Service {
    public constructor(private readonly Repository: Repository) {
        this.Repository = Repository;
    }
    
    public async findUser(Email: string): Promise<User | null> {
        return this.Repository.findUser(Email);
    }

    public async getAllRequest(): Promise<ServiceRequest[]> {
        return this.Repository.getAllRequest();
    }

    public async getAllRequestofSp(Id: number): Promise<ServiceRequest[]> {
        return this.Repository.getAllRequestofSp(Id);
    }

    
    public async getServiceDetailsById(ServiceId: number) {
        return this.Repository.getServiceDetailsById(ServiceId);
    }

    public async getServiceDetailsById1(ServiceId: number) {
        return this.Repository.getServiceDetailsById1(ServiceId);
    }

    public async getServiceAddress(ServiceRequestId: number): Promise<SRAddress | null> {
        return this.Repository.getServiceAddress(ServiceRequestId);
    }

    public async getUserDetails(id: number): Promise<User | null> {
        return this.Repository.getUserDetails(id);
    }

    public async acceptService(Id: number, ServiceId: number) {
        return this.Repository.acceptService(Id,ServiceId);
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
         let date2= new Date(serviceRequest[sr].ServiceStartDate);
         let date1= new Date(date);
          if (date2.getTime() === date1.getTime()) {
            const acceptTime = time.toString().split(":");
            if (acceptTime[1] === "30") {
              acceptTime[1] = "0.5";
            }
            const acceptStartTime =
              parseFloat(acceptTime[0]) + parseFloat(acceptTime[1]);
    
            const availableTime =
              serviceRequest[sr].ServiceStartTime.toString().split(":");
            if (availableTime[1] === "30") {
              availableTime[1] = "0.5";
            }
            const availableStartTime =
              parseFloat(availableTime[0]) + parseFloat(availableTime[1]);
            const availableTotalHour =
              serviceRequest[sr].ServiceHours + serviceRequest[sr].ExtraHours!;
            const totalAcceptTime = acceptStartTime + acceptTotalHour + 1;
            const totalAvailableTime = availableStartTime + availableTotalHour + 1;
            console.log("acceptStartTime"+acceptStartTime);
            console.log("acceptTotalHour"+acceptTotalHour);
            console.log("totalaccept"+totalAcceptTime);
            console.log("accepttime"+acceptStartTime);
            if (
              availableStartTime >= totalAcceptTime ||
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
   
}