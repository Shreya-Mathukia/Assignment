import { ServiceRequest } from "../../models/servicerequest";
import { DashboardRepository } from "./Repository"




export class DashboardService {
    public constructor(private readonly DashboardRepository: DashboardRepository) {
        this.DashboardRepository = DashboardRepository;
    }

    public async getSR(): Promise<ServiceRequest[] | null> {
        return this.DashboardRepository.getSR();
    }

    public async ServiceDetails(ServiceId: number): Promise<ServiceRequest[] | null> {
        return this.DashboardRepository.ServiceDetails(ServiceId);
    }

    public async getServiceDetailsById(ServiceId: number) {
      return this.DashboardRepository.getServiceById(ServiceId);
    }    
    public async getAllRequestofSp(Id: number): Promise<ServiceRequest[]> {
      return this.DashboardRepository.getAllRequestofSp(Id);
      }
    public async RescheduleService(ServiceRequest: ServiceRequest, ServiceId: number) {
        return this.DashboardRepository.RescheduleService(ServiceRequest, ServiceId);
    }

    public async CancelService(ServiceId: number) {
        return this.DashboardRepository.CancelService(ServiceId);
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