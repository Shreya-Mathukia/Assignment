import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { SRAddress } from "../../models/servicerequestaddress";
import { User } from "../../models/user";

export class ScheduleRepository {

    public async findByZipCode(Zipcode: string): Promise<User | null> {
        return db.Users.findOne({ where: {Zipcode: Zipcode} });
    }

    public async findByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: {Email: Email} });
    }

    public async getSP(): Promise<User[]> {
        return db.Users.findAll({ where: {RoleId: 2} });
    }

    public async scheduleService(ServiceRequest: {[key: number | string] : ServiceRequest}): Promise<ServiceRequest> {
        return db.ServiceRequest.create(ServiceRequest, {include: ['ServiceRequestAddress', 'ExtraService' ]});
    }
}