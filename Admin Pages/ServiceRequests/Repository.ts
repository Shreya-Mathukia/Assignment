import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { SRAddress } from "../../models/servicerequestaddress";
import { Op } from "sequelize"; 
;

export class Repository {
    
    public async IsAdmin(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email, RoleId:1}});
    }

    public async getUserByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }
    public async getAllRequest() {
        return db.ServiceRequest.findAll({attributes:['ServiceId','UserId','Zipcode','ServiceProviderId','ServiceStartDate', 'ServiceStartTime','Subtotal','TotalCost','Discount','Status','PaymentDone'],
                include:['UserRequest','ServiceRequestAddress'] });
    }
    

    


    public async getServiceById(ServiceId: number) {
        return db.ServiceRequest.findOne({  where: { ServiceId: ServiceId } });
    }       
    public async getAllRequestofSp(Id: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: { ServiceProviderId: Id } });
    }
    public async acceptService(Id: number, ServiceId: number) {
        return db.ServiceRequest.update({ Status: '2', ServiceProviderId: Id},{ where: { ServiceId: ServiceId , Status: {
            [Op.or]: [1, 3]
          }} });
    }
    public async editDetailofSR(ServiceStartDate: any,ServiceStartTime: any,ServiceId: number) {
        return db.ServiceRequest.update({ServiceStartDate:ServiceStartDate,ServiceStartTime:ServiceStartTime},{where:{ServiceId: ServiceId}});
    }
    public async updateAddress(SRId: number,sraddress: any ){
        const {StreetName, HouseNumber, City,  PostalCode} = sraddress;
        return db.SRAddress.update({ AddressLine1: StreetName, AddressLine2: HouseNumber, City: City, PostalCode: PostalCode }, { where: { ServiceRequestId: SRId } });
  
    }



    public async CancelService(ServiceId: number) {
            return db.ServiceRequest.update({Status: '3',ModifiedBy: '1'}, { where: {ServiceId: ServiceId}});
        }
    
}