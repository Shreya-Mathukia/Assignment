import { db } from "../../../models/index";
import { ServiceRequest } from "../../../models/servicerequest";
import { SRAddress } from "../../../models/servicerequestaddress";
import { User } from "../../../models/user";

export class ScheduleRepository {

    public async findByZipCode(Zipcode: string): Promise<User | null> {
        return db.Users.findOne({ where: {Zipcode: Zipcode} });
    }

    public async findByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }


    public async scheduleService(ServiceRequest: ServiceRequest): Promise<ServiceRequest> {
        const { UserId,ServiceId,ServiceStartDate, ServiceStartTime,ServiceHourlyRate,Zipcode,ServiceHours,ExtraHours,Comments,HasPets,Subtotal,TotalCost,Discount} = ServiceRequest;
        return db.ServiceRequest.create({
            UserId: UserId,
            ServiceId:ServiceId,
            ServiceStartDate:ServiceStartDate,
             ServiceStartTime:ServiceStartTime,
             ServiceHourlyRate:ServiceHourlyRate,
             Zipcode:Zipcode,
             ServiceHours:ServiceHours,
             ExtraHours:ExtraHours,
             Subtotal:Subtotal,
             TotalCost:TotalCost,
             Discount:Discount,
             Comments:Comments,
             HasPets:HasPets,
        
            
        });
    }
}