import { User } from "../../models/user";
import { ProfileRepository } from "./Repository";
import { UserAddress } from "../../models/useraddress";


export class ProfileService {
    public constructor(private readonly ProfileRepository: ProfileRepository) {
        this.ProfileRepository = ProfileRepository;
    }
    
    public async findUserByEmail(Email: string): Promise<User | null> {
        return this.ProfileRepository.findUserByEmail(Email);
    }

    public async MyDetails( user: User , LoggedInEmail: string){
        return this.ProfileRepository.MyDetails(user, LoggedInEmail);
    }


    
    public async findByAddressId(Id: number): Promise<UserAddress | null> {
        return this.ProfileRepository.findByAddressId(Id);
    }


    public async updateUserAddress(Id: number,useraddress: any ){
        return this.ProfileRepository.updateUserAddress(Id, useraddress );
    }

    public async CreateUserAddress(address: any): Promise<UserAddress> {
        return this.ProfileRepository.CreateUserAddress(address);
    }


   
   

    public async changePassword(Email: string, Password: string) {
        return this.ProfileRepository.changePassword(Email, Password);
    }
}