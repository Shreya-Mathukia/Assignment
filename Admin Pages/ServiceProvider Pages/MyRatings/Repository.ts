import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { rating } from "../../models/rating";
import { SRAddress } from "../../models/servicerequestaddress";

export class Repository {
    
    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async getAllRequest(UserId: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: { ServiceProviderId: UserId } });
    }

    public async getRatingsById(ServiceRequestId: number): Promise<rating | null> {
        return db.rating.findOne({ attributes:['ServiceRequestId','Ratings','Comments'] ,where: { ServiceRequestId: ServiceRequestId } });
    }
   
   
    public async getUserDetails(id: number): Promise<User | null> {
        return db.Users.findOne({ attributes:['FirstName','LastName'], where: { id: id}});
    }

    
}