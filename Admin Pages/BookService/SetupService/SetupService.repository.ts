import { db } from "../../models/index";
import { User } from "../../models/user";

export class ServiceRepository {
    
    public async getSP(): Promise<User[]> {
        return db.Users.findAll({ where: {RoleId: 2} });
    }
}