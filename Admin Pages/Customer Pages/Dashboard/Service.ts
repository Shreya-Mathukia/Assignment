import { ServiceRequest } from "../../models/servicerequest";
import { DashboardRepository } from "./Repository"




export class DashboardService {
    public constructor(private readonly DashboardRepository: DashboardRepository) {
        this.DashboardRepository = DashboardRepository;
    }

    public async getSR(): Promise<ServiceRequest[] | null> {
        return this.DashboardRepository.getSR();
    }

    public async ServiceHistory(): Promise<ServiceRequest[] | null> {
        return this.DashboardRepository.ServiceHistory();
    }

    
    public async RescheduleService(ServiceRequest: ServiceRequest, ServiceId: number) {
        return this.DashboardRepository.RescheduleService(ServiceRequest, ServiceId);
    }

    public async CancelService(ServiceId: number) {
        return this.DashboardRepository.CancelService(ServiceId);
    }
  
    public helperHasFutureSameDateAndTime(
        date: string,
        serviceRequest: ServiceRequest[],
        totalHour: number,
        time: string ) 
      {
          let srDate;
          let startTime;
          let endTime;
          const uTime = time.split(":");
          if(uTime[1] === '30')
          {
            uTime[1] = '0.5';
          }
          const updatedTime = parseFloat(uTime[0]) + parseFloat(uTime[1]);
          const enteredDate = new Date(date.split("-").reverse().join("-"));
          let matched;
          for (let count in serviceRequest) 
          {
            if (new Date(serviceRequest[count].ServiceStartDate) > enteredDate) 
            {
              matched = false;
            } 
            else if (
              new Date(serviceRequest[count].ServiceStartDate) < enteredDate
            ) 
            {
              matched = false;
            } 
            else 
            {
    
              const sTime =serviceRequest[count].ServiceStartTime.toString().split(":");
              if(sTime[1] === '30')
              {
                sTime[1] = '0.5';
              }
              const availStartTime = parseFloat(sTime[0]) + parseFloat(sTime[1]);
              const availTotalHour =
                serviceRequest[count].ServiceHours + serviceRequest[count].ExtraHours;
              console.log(updatedTime);
              console.log(totalHour)
              console.log(availStartTime);
              console.log(availTotalHour);
              if (
                updatedTime + totalHour < availStartTime ||
                availStartTime + availTotalHour < updatedTime
              ) 
              {
                matched = false;
              }
              else
              {
                srDate = serviceRequest[count].ServiceStartDate.toString().split("-").reverse().join("-");
    
                const srTime = availStartTime.toString().split('.');
                if(srTime[1] === '5'){
                  srTime[1] = '30'
                }else{
                  srTime[1] = '00'
                }
                startTime = srTime.join(':');
    
                const eTime = (availStartTime + availTotalHour).toString().split('.');
                if(parseInt(eTime[1]) === 5)
                {
                  eTime[1] = '30';
                }else
                {
                  eTime[1] = '00';
                }
                endTime = eTime.join(':');
                matched = true;
                break;
              }
              
            }
          }
          return {matched, srDate, startTime, endTime};
      };
    
}