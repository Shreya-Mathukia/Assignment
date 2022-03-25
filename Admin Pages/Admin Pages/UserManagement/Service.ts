import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { SRAddress } from "../../models/servicerequestaddress";
import { Repository } from "./Repository";

export class Service {
    public constructor(private readonly Repository: Repository) {
        this.Repository = Repository;
    }


    public async isAdmin(Email: string):Promise <User | null>{
      return this.Repository.isAdmin(Email);
  
    }

    public async getAllUsers():Promise<User[] | null>{
        return this.Repository.getAllUsers();
      }
    
      public async getUserDetailById(userId:number): Promise<User | null>{
        return this.Repository.getUserDetailById(userId);
      }
    
      public async activateUser(userId:number){
        return this.Repository.activateUser(userId);
      }
    
      public async DeactivateUser(userId:number){
        return this.Repository.DeactivateUser(userId);
      }
      public async getSpById(userId:number): Promise<User | null>{
        return this.Repository.getSpDetailById(userId);
      }

      public async ApproveHelperAccount(userId:number){
        return this.Repository.ApproveHelperAccount(userId);
      }
}