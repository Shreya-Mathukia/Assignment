import { db } from "../../../models/index";
import { SRAddress } from "../../../models/servicerequestaddress";
import { ServiceRequest, ServiceRequestModelAttributes  } from "../../../models/servicerequest";
import {User} from "../../../models/user";

export class ServiceAddressRepository {
    public async CreateServiceAddress(address: SRAddress): Promise<SRAddress> {
        const{ ServiceRequestId,AddressLine1, AddressLine2,City,State,PostalCode,Email}=address;
        return db.SRAddress.create({
            ServiceRequestId:ServiceRequestId,
            AddressLine1:AddressLine1,
            AddressLine2:AddressLine2,
            City:City,
            State:State,
            PostalCode:PostalCode,
            Email:Email,
        });
    }

    public async findServiceRequestById(ServiceRequestId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: {ServiceRequestId: ServiceRequestId} });
    }
    
    public async getSP(): Promise<User[]> {
        return db.Users.findAll({ where: {RoleId: 2} });
    }
 
    //check that sp has not blocked the user.
   
}    