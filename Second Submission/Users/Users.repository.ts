import { Json } from "sequelize/dist/lib/utils";
import  {db} from "../models/index";
import { User } from "../models/user";
import {Op} from "sequelize";


export class UsersRepository {
    public async getUsersById(userId: number): Promise<User | null> {
        return db.Users.findOne({ where: {id: userId}});
    }



    public async getUsers(): Promise<User[]> {
        return db.Users.findAll();
    }

    public async createUser(users: User): Promise<User> {
        return db.Users.create({users});
    }
    
    
    public async updateUsers(users: User, userId: number): Promise<[number, User[]]> {
        return db.Users.update(users, { where: {id: userId}});
    }

    public async deleteUsers(userId: number): Promise<number> {
        return db.Users.destroy({ where: {id: userId}});  
    }
    
}
