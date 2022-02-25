import { ServiceRepository } from "./SetupService.repository";
import { User } from "../../models/user";
import jwt from "jsonwebtoken";
require("dotenv").config();

export class ServiceService {
    public constructor(private readonly serviceRepository : ServiceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public async getSP(): Promise<User[]> {
        return this.serviceRepository.getSP();
    } 

    public generateToken(Email: string, Zipcode: string): string {
        const emailToken = jwt.sign({Email, Zipcode}, process.env.SECRET_KEY!, {expiresIn: '6h'});
        return emailToken;
    }
}