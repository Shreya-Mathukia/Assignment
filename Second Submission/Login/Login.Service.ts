import { Json } from "sequelize/dist/lib/utils";
import { User } from "../models/user";
import { loginRepository } from "./Login.Repository";

export class loginService {
    public constructor(private readonly loginRepository: loginRepository) {
        this.loginRepository = loginRepository;
    }

    public async login(users: User): Promise<User | null> {
        return this.loginRepository.login(users);
    }

    public async createCustomer(users: User): Promise<User> {
        return this.loginRepository.createCustomer(users);
    }

    public async createServiceProvider(users: User): Promise<User> {
        return this.loginRepository.createServiceProvider(users);
    }
}