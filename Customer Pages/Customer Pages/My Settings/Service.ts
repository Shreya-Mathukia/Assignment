import { User } from "../../models/user";
import { MySettingsRepository } from "./Repository";
import { UserAddress } from "../../models/useraddress";
import { SRAddress } from "../../models/servicerequestaddress";

export class MySettingsService {
    public constructor(private readonly MysettingsRepository: MySettingsRepository) {
        this.MysettingsRepository = MysettingsRepository;
    }
    
    public async findUserByEmail(Email: string): Promise<User | null> {
        return this.MysettingsRepository.findUserByEmail(Email);
    }

    public async findByAddressId(Id: number): Promise<UserAddress | null> {
        return this.MysettingsRepository.findByAddressId(Id);
    }


    public async MyDetails( user: User ){
        return this.MysettingsRepository.MyDetails(user);
    }


    public async updateUserAddress(Id: number,useraddress: UserAddress ){
        return this.MysettingsRepository.updateUserAddress(Id, useraddress );
    }

    public async CreateUserAddress(address: UserAddress): Promise<UserAddress> {
        return this.MysettingsRepository.CreateUserAddress(address);
    }


   
    public deleteAddress(Id: number) {
        return this.MysettingsRepository.deleteAddress(Id);
    }

    public async changePassword(Email: string, Password: string): Promise<[number, User[]]> {
        return this.MysettingsRepository.changePassword(Email, Password);
    }
}