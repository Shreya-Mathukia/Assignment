import { db } from "../../models/index";
import { User } from "../../models/user";
import { Op } from "sequelize";

export class Repository {

  public async isAdmin(Email: string):Promise <User | null>{
    return db.Users.findOne({ where:{ Email: Email, RoleId:1 }});

  }

  public async getAllUsers():Promise<User[] | null>{
    return db.Users.findAll({ attributes:['FirstName','LastName',
                                         ['createdAt','DateOfRegistration'],
                                         'RoleId','Mobile',
                                         ['Zipcode','PostalCode'],
                                         'IsActive'], where:{RoleId:{[Op.or]:[3,2]}}});
  }

  public async getUserDetailById(userId:number): Promise<User | null>{
    return db.Users.findOne({where:{id:userId, RoleId:{[Op.or]:[3,2]}}});
  }

  public async activateUser(userId:number){
    return db.Users.update({IsActive:true},{where:{id:userId}});
  }

  public async DeactivateUser(userId:number){
    return db.Users.update({IsActive:false},{where:{id:userId}});
  }

  public async getSpDetailById(userId:number): Promise<User | null>{
    return db.Users.findOne({where:{id:userId, RoleId:2}});
  }

  public async ApproveHelperAccount(userId:number){
    return db.Users.update({Isapproved:true},{where:{id:userId, RoleId:2}});
  }
}