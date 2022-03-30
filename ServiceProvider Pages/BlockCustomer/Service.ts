import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
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
   
    public async getUserDetails(id: number): Promise<User | null> {
        return this.Repository.getUserDetails(id);
        }

    public async check(UserId: number,TargetUserId:number){
        return this.Repository.check(UserId,TargetUserId) ;
       }
    
    public async blockCustomer(UserId: number,TargetUserId:number){
        return this.Repository.blockCustomer(UserId,TargetUserId) ;    
    }

    public async UpdateBlockCustomer(UserId: number,TargetUserId:number){
        return this.Repository.UpdateBlockCustomer(UserId,TargetUserId) ;
        }
  
    public async UnblockCustomer(UserId: number,TargetUserId:number){
        return this.Repository.UnblockCustomer(UserId,TargetUserId) ;    }
    

    public async removefromFavPro(UserId: number,TargetUserId:number){
        return this.Repository.removefromFavPro(UserId,TargetUserId) ;    }
     
}