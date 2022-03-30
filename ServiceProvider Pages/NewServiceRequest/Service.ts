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
}