import { db } from "../../models/index";
import { SRAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";

export class ProfileRepository {
 
    public async findUserByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }


    public async MyDetails( user: User ,LoggedInEmail: string) {
        const { FirstName, LastName, Email, Mobile, DOB, NationalityId , UserProfilePicture} = user;
        return db.Users.update({ FirstName: FirstName, LastName: LastName, Email:Email,Mobile: Mobile, DOB:DOB, NationalityId:NationalityId,UserProfilePicture }, { where: { Email: LoggedInEmail } });
    }

    public async findByAddressId(Id: number): Promise<UserAddress | null> {
        return db.UserAddress.findOne({ where: { UserId: Id } });
    }

    public async updateUserAddress(Id: number,useraddress: any ){
        const {StreetName, HouseNumber, City,  PostalCode, Mobile, Email} = useraddress;
         db.UserAddress.update({ AddressLine1: StreetName, AddressLine2: HouseNumber, City: City, PostalCode: PostalCode, Mobile: Mobile, Email:Email }, { where: { AddressId: Id } });
        return db.UserAddress.findOne({where: {AddressId: Id}});
        }
    

        public async CreateUserAddress(address: any): Promise<UserAddress> {
            const{ UserId,StreetName, HouseNumber,City,PostalCode,Mobile,Email}=address;
            return db.UserAddress.create({
                UserId: UserId,
                AddressLine1: StreetName,
                AddressLine2: HouseNumber,
                City: City,
                PostalCode: PostalCode,
                Mobile: Mobile,
                Email: Email,
                IsDeleted: false
            });
        }    
    
   

    public async changePassword(Email: string, Password: string): Promise<[number, User[]]> {
        return db.Users.update({ Password: Password }, {where: { Email: Email }});
    }
}