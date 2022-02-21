import { db } from "../../models/index";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

export class UserAddressRepository {
    public async UserAddress(address: {[key: number | string] : UserAddress}): Promise<UserAddress> {
        return db.UserAddress.create(address);
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }

    public async getAddresses(Email: string): Promise<UserAddress[]> {
        return db.UserAddress.findAll({ where: { Email: Email } });
    }
}