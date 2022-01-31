import { Json } from "sequelize/dist/lib/utils";
import  {db} from "../models/index";
import { User } from "../models/user";


export class UsersRepository {
    public async getUsersById(userId: number): Promise<User | null> {
        return db.Users.findOne({ where: {id: userId}});
    }

    public async getUsers(): Promise<User[]> {
        return db.Users.findAll();
    }

    public async createCustomer(users: User): Promise<User> {
        const { FirstName,LastName,Email,Password,Mobile } =  users;
        return db.Users.create({
          FirstName: FirstName,
          LastName: LastName,
          Email: Email,
         Password: Password,
         Mobile: Mobile ,
         RoleId: 1,
         IsRegisteredUser: true
        });
    }

    public async createServiceProvider(users: User): Promise<User> {
        const { FirstName,LastName,Email,Password,Mobile } =  users;
        return db.Users.create({
          FirstName: FirstName,
          LastName: LastName,
          Email: Email,
         Password: Password,
         Mobile: Mobile ,
         RoleId: 2,
         IsRegisteredUser: true
        });
    }

    public async updateUsers(users: User, userId: number): Promise<[number, User[]]> {
        return db.Users.update(users, { where: {id: userId}});
    }

    public async deleteUsers(userId: number): Promise<number> {
        return db.Users.destroy({ where: {id: userId}});  
    }
    
}
