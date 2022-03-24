import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { SRAddress } from "../../models/servicerequestaddress";
import { Repository } from "./Repository";
import { rating } from "../../models/rating";

export class Service {
    public constructor(private readonly Repository: Repository) {
        this.Repository = Repository;
    }
    
    
    public async findUser(Email: string): Promise<User | null> {
        return this.Repository.findUser(Email);
    }

    public async getAllRequest(UserId: number): Promise<ServiceRequest[]> {
        return this.Repository.getAllRequest(UserId);
    }

    public async getRatingsById(id: number): Promise<rating| null> {
        return this.Repository.getRatingsById(id);
    
    }

        public async getUserDetails(id: number): Promise<User | null> {
        return this.Repository.getUserDetails(id);
    
    }
    
   
    
   
}