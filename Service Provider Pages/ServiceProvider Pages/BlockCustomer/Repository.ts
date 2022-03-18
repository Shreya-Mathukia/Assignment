import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";

export class Repository {
    
    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async getAllRequest(UserId: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ attributes:['UserId'], where: { UserId: UserId } });
    }   
   
    public async getUserDetails(id: number): Promise<User | null> {
        return db.Users.findOne({ attributes:['FirstName','LastName'], where: { id: id}});
    }

    public async check(UserId: number,TargetUserId:number){
        return db.FavoriteAndBlocked.findOne( { where:{ UserId: UserId, TargetUserId:TargetUserId} })
    }
    
    public async blockCustomer(UserId: number,TargetUserId:number){
        return db.FavoriteAndBlocked.create({IsBlocked: true , IsFavorite: false, UserId: UserId, TargetUserId:TargetUserId})
    }

    public async UpdateBlockCustomer(UserId: number,TargetUserId:number){
        return db.FavoriteAndBlocked.update({ IsBlocked: true}, { where:{ UserId: UserId, TargetUserId:TargetUserId} })
    }
  
    public async UnblockCustomer(UserId: number,TargetUserId:number){
        return db.FavoriteAndBlocked.update({ IsBlocked: false}, { where:{ UserId: UserId, TargetUserId:TargetUserId} })
    }
    

    public async removefromFavPro(UserId: number,TargetUserId:number){
        return db.FavoriteAndBlocked.update({ IsFavorite: false}, { where:{ UserId: UserId, TargetUserId:TargetUserId} })
    }
     
}