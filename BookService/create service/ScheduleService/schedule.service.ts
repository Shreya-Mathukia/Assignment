import { ServiceRequest } from "../../../models/servicerequest";
import { User } from "../../../models/user";
import { ScheduleRepository } from "./schedule.repository";
require("dotenv").config();
import jwt from "jsonwebtoken";


export class ScheduleService {
    public constructor(private readonly scheduleRepository: ScheduleRepository) {
        this.scheduleRepository = scheduleRepository;
    }

    public async findByZipCode(ZipCode: string): Promise<User | null> {
        return this.scheduleRepository.findByZipCode(ZipCode);
    }

    public async findByEmail(Email: string): Promise<User | null> {
        return this.scheduleRepository.findByEmail(Email);
    }

    public async scheduleService(ServiceRequest: ServiceRequest): Promise<ServiceRequest> {
        return this.scheduleRepository.scheduleService(ServiceRequest);
    }

    
    public generateToken(Email: string, Zipcode: string, ServiceRequestId: number ): string {
        const emailToken = jwt.sign({Email, Zipcode, ServiceRequestId}, process.env.SECRET_KEY!, {expiresIn: '6h'});
        return emailToken;
    }

}