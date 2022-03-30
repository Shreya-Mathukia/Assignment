import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { SRAddress } from "../../models/servicerequestaddress";
import { Op } from "sequelize";


export class Repository {
    
    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: { Email: Email}});
    }

    public async getAllRequest() {
        return db.ServiceRequest.findAll({ include:['UserRequest','ServiceRequestAddress'] ,where: {  Status: "1"}});
    }

    public async getAllRequestofSp(Id: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: { ServiceProviderId: Id } });
    }
    public async blockCustomerCheck(SpId: number){
        return db.FavoriteAndBlocked.findAll({    attributes:['TargetUserId'] ,where:{ UserId: SpId,IsBlocked:true}})
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
    

    public async acceptService(Id: number, ServiceId: number) {
        return db.ServiceRequest.update({ Status: '2', ServiceProviderId: Id},{ where: { ServiceId: ServiceId , Status: {
            [Op.or]: [1, 3]
          }} });
    }
   
}