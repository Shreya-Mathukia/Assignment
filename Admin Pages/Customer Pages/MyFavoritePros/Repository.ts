import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { db } from "../../models/index";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { Op } from "sequelize";

export class Repository {

    public async findFavoriteSp(UserId: number, spId:number): Promise<FavoriteAndBlocked | null> {
        return db.FavoriteAndBlocked.findOne({where: {UserId: UserId, TargetUserId: spId}});
    }

    public async updateFavoriteSp(favorite: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]] | [affectedCount: number]> {
        return db.FavoriteAndBlocked.update({ IsFavorite: favorite.IsFavorite}, { where: { UserId:favorite.UserId, TargetUserId:favorite.TargetUserId } });
    }

    public async createFavoriteSp(favorite: any): Promise<FavoriteAndBlocked | null> {
        return db.FavoriteAndBlocked.create(favorite);
    }

    public async findByEmail(Email: string): Promise<User | null> {
        return db.Users.findOne({ where: { Email: Email } });
    }

    public async findServiceById(UserId: number): Promise<ServiceRequest[]> {
        return db.ServiceRequest.findAll({ where: { UserId: UserId } });
    }

    public async updateBlockedSp(blocked: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]] | [affectedCount: number]> {
        return db.FavoriteAndBlocked.update({ IsBlocked: blocked.IsBlocked }, { where: { UserId: blocked.UserId, TargetUserId: blocked.TargetUserId } });
    }

    public async findByUId(UserId: number): Promise<User | null> {
        return db.Users.findOne({ where: { UserId: UserId } });
    }

    public async findAllSPWorkedWithCustInPast(UserId: number[]): Promise<User[] | null> {
        return db.Users.findAll({
            where: { UserTypeId: 2, UserId: {
                [Op.or]: UserId
            } },
            include: 'TargetUserId'
        });
    }
}