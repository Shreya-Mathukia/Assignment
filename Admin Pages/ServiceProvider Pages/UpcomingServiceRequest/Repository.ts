import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { SRAddress } from "../../models/servicerequestaddress";

export class Repository {
    
    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async getAllUpcomingRequest(UserId: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({attributes:['UserId','ServiceRequestId','ServiceId','ServiceStartDate', 'ServiceStartTime','ServiceHourlyRate','ServiceHours','ExtraHours','Comments','HasPets','TotalCost','Discount'], where: { ServiceProviderId: UserId , Status:'2'} });
    }

    public async getServiceDetailsById(ServiceId: number) {
        return db.ServiceRequest.findOne({ attributes:['UserId','ServiceRequestId','ServiceId','ServiceStartDate', 'ServiceStartTime','ServiceHourlyRate','ServiceHours','ExtraHours','Comments','HasPets','TotalCost','Discount'], where: { ServiceId: ServiceId } });
    }

    public async getServiceAddress(ServiceRequestId: number): Promise<SRAddress | null> {
        return db.SRAddress.findOne({ attributes:['AddressLine1','AddressLine2','City','PostalCode'], where: { ServiceRequestId: ServiceRequestId}});
    }

    public async getUserDetails(id: number): Promise<User | null> {
        return db.Users.findOne({ attributes:['FirstName','LastName'], where: { id: id}});
    }

    public async CancelService(ServiceId: number) {
        return db.ServiceRequest.update({Status: '3',ModifiedBy: '2',ServiceProviderId: null}, { where: {ServiceId: ServiceId}});
    }

    public async CompleteService(ServiceId: number) {
        return db.ServiceRequest.update({Status: '4',ModifiedBy: '2'}, { where: {ServiceId: ServiceId}});
    }
   
}