import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { Op } from "sequelize";
import { User } from "../../models/user";
import { rating } from "../../models/rating";

export class HistoryRepository {
    
    public async findUser(Email: string): Promise<User | null> {
        return db.Users.findOne({where: { Email: Email}});
    }

    public async getAllPastRequest(UserId: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: { UserId: UserId } });
    }

    public async getServiceById(ServiceId: number) {
        return db.ServiceRequest.findOne({ where: { ServiceId: ServiceId } });
    }

    public async getServiceByRequestId(ServiceRequestId: number): Promise<ServiceRequest | null> {
        return db.ServiceRequest.findOne({ where: { ServiceRequestId: ServiceRequestId}});
    }

    public async giveRatings(Rating: {[key: number | string] : rating}): Promise<rating> {
        return db.rating.create(Rating);
    }

    public async getRatingsById(ServiceRequestId: number): Promise<rating | null> {
        return db.rating.findOne({ where: { ServiceRequestId: ServiceRequestId } });
    }

}