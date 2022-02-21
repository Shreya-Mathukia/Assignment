import { User } from "../../models/user";
import { UserAddress } from "../../models/useraddress";
import { UserAddressRepository } from "./address.repository";

export class UserAddressService {
    public constructor(private readonly addressRepository: UserAddressRepository) {
        this.addressRepository = addressRepository;
    }

    public async UserAddress(address: {[key: number | string] : UserAddress}): Promise<UserAddress> {
        return this.addressRepository.UserAddress(address);
    }

    public async findUserByEmail(Email: string): Promise<User | null> {
        return this.addressRepository.findUserByEmail(Email);
    }

    public async getAddresses(Email: string): Promise<UserAddress[]> {
        return this.addressRepository.getAddresses(Email);
    }

}

