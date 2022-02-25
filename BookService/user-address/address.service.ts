import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { UserAddressRepository } from "./address.repository";

export class UserAddressService {
    public constructor(private readonly addressRepository: UserAddressRepository) {
        this.addressRepository = addressRepository;
    }

    public async CreateUserAddress(address: UserAddress): Promise<UserAddress> {
        return this.addressRepository.CreateUserAddress(address);
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return this.addressRepository.findUserByEmail(Email);
    }

    public async getAddresses(Email: string): Promise<UserAddress[]> {
        return this.addressRepository.getAddresses(Email);
    }

}

