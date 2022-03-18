import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";

export class DashboardRepository {
    
    public async getSR(): Promise<ServiceRequest[] | any> {
        return db.ServiceRequest.findAll({ where: {Status: '1'} });
    }
    
    public async findSPById(UserId: number){
        return db.Users.findOne({ where: { id: UserId } });
    } 

    public async ServiceHistory(): Promise<ServiceRequest[] | null> {
        return db.ServiceRequest.findAll({ attributes: ['ServiceId' , 'ServiceStartDate' , 'ServiceStartTime' , 'ServiceHours' , 'ExtraHours', 'TotalCost', 'Status']});
    }


    public async RescheduleService(ServiceRequest: ServiceRequest, ServiceId: number) {
        const {ServiceStartDate, ServiceStartTime} = ServiceRequest;
        return db.ServiceRequest.update({ServiceStartDate:ServiceStartDate, ServiceStartTime:ServiceStartTime}, { where: {ServiceId: ServiceId}});
    }

    public async CancelService(ServiceId: number) {
            return db.ServiceRequest.update({Status: '3',ModifiedBy:'3'}, { where: {ServiceId: ServiceId}});
    }
    

   
} 