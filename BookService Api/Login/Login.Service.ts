import { User } from "../models/user";
import { loginRepository } from "./Login.Repository";
import jwt from "jsonwebtoken";


export class loginService {
    public constructor(private readonly loginRepository: loginRepository) {
        this.loginRepository = loginRepository;
    }

    public async getUserByEmail(users: User): Promise<User | null> {
        return this.loginRepository.getUserByEmail(users);
    }

    public async createCustomer(users: User): Promise<User> {
        return this.loginRepository.createCustomer(users);
    }

    public async createServiceProvider(users: User): Promise<User> {
        return this.loginRepository.createServiceProvider(users);
    }

    public generateToken(Email: string): string {
        const token = jwt.sign({Email}, process.env.SECRET_KEY!, {expiresIn: '12h'});
        return token;
    }

    
}