import { db } from "../../models/index";
import { SRAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

export class MySettingsRepository {
 
    public async findUserByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async findByAddressId(Id: number): Promise<UserAddress | null> {
        return db.UserAddress.findOne({ where: { AddressId: Id } });
    }

    public async MyDetails( user: User ) {
        const {Email, FirstName, LastName, Mobile, DOB, LanguageId } = user;
        return db.Users.update({ FirstName: FirstName, LastName: LastName, Mobile: Mobile, DOB:DOB, LanguageId:LanguageId }, { where: { Email: Email } });
    }

    public async updateUserAddress(Id: number,useraddress: UserAddress ){
        const {AddressLine1, AddressLine2, City, State, PostalCode, Mobile, Email} = useraddress;
         db.UserAddress.update({ AddressLine1: AddressLine1, AddressLine2: AddressLine2, City: City, State: State, PostalCode: PostalCode, Mobile: Mobile, Email:Email }, { where: { AddressId: Id } });
        return db.UserAddress.findOne({where: {Address: Id}});
        }
    

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
    
    public deleteAddress(Id: number) {
        return db.UserAddress.update({IsDeleted: true},{ where: { AddressId: Id } });
    }

    public async changePassword(Email: string, Password: string): Promise<[number, User[]]> {
        return db.Users.update({ Password: Password }, {where: { Email: Email }});
    }
}