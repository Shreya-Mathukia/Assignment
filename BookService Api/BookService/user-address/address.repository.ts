import { db } from "../../models/index";
import { User, UsersModelAttributes } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

export class UserAddressRepository {
    public async CreateUserAddress(address: UserAddress): Promise<UserAddress> {
        const{ UserId,AddressLine1, AddressLine2,City,State,PostalCode,Mobile,Email}=address;
        return db.UserAddress.create({
            UserId: UserId,
            AddressLine1: AddressLine1,
            AddressLine2: AddressLine2,
            City: City,
            State: State,
            PostalCode: PostalCode,
            Mobile: Mobile,
            Email: Email,
            IsDeleted: false
        });
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }

    public async getAddresses(Email: string) {
        return db.UserAddress.findAll({ where: { Email: Email } });
    }
}