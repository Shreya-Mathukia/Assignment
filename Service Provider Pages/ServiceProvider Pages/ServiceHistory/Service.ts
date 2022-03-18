import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { SRAddress } from "../../models/servicerequestaddress";
import { Repository } from "./Repository";

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

    
    public async getServiceDetailsById(ServiceId: number) {
        return this.Repository.getServiceDetailsById(ServiceId);
    }

    public async getServiceDetailsById1(ServiceId: number) {
        return this.Repository.getServiceDetailsById1(ServiceId);
    }

    public async getServiceAddress(ServiceRequestId: number): Promise<SRAddress | null> {
        return this.Repository.getServiceAddress(ServiceRequestId);
    }

    public async getUserDetails(id: number): Promise<User | null> {
        return this.Repository.getUserDetails(id);
    }

    
   
}