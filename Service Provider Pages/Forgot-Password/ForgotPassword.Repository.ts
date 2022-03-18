import { db } from "../models/index";
import { User } from "../models/user";

export class ForgotPasswordRepository {
    
    public async getUsersByEmail(Email: string) {
        return db.Users.findOne({ where: {Email: Email} });
    }
    
    public async UpdateUser(Password: string, Email: string) {
        return db.Users.update({ Password: Password }, {where: {Email: Email}});
    }
}

