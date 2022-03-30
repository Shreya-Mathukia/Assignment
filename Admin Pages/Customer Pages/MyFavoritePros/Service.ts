import { FavoriteAndBlocked } from "../../models/favoriteandblocked";
import { ServiceRequest } from "../../models/servicerequest";
import { User } from "../../models/user";
import { Repository } from "./Repository";
type SP = {
    id: number,
    Name: string,
    Avatar: String | undefined,
    Email: string,
    ZipCode: String | undefined
}

export class Service {

    public constructor(private readonly Repository: Repository) {
        this.Repository = Repository;
    }

    public async findFavoriteSp(UserId: number, spId:number): Promise<FavoriteAndBlocked|null> {
        return this.Repository.findFavoriteSp(UserId, spId);
    }

    public async updateFavoriteSp(favorite: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]] | [affectedCount: number]> {
        return this.Repository.updateFavoriteSp(favorite);
    }

    public async createFavoriteSp(favorite: FavoriteAndBlocked): Promise<FavoriteAndBlocked | null> {
        return this.Repository.createFavoriteSp(favorite);
    }

    public async findByEmail(Email: string): Promise<User | null> {
        return this.Repository.findByEmail(Email);
    }

    public async findServiceById(UserId: number): Promise<ServiceRequest[]> {
        return this.Repository.findServiceById(UserId);
    }
    
    public async findAllSPWorkedWithCustInPast(UserId: number[]): Promise<User[] | null> {
        return this.Repository.findAllSPWorkedWithCustInPast(UserId);
    }

    public async updateBlockedSp(blocked: FavoriteAndBlocked): Promise<[number, FavoriteAndBlocked[]] | [affectedCount: number]> {
        return this.Repository.updateBlockedSp(blocked);
    }
    
    public findAllSpIdWorkedWithCustInPast(service: ServiceRequest[]) {
        const spId: number[] = [];
        for(let s in service) {
            if(Number(service[s].Status) === 2 && service[s].ServiceProviderId != null) {
                spId.push(service[s].ServiceProviderId!);
            }
        }
        return spId;
    }

    public async findAllSpWorkedWithCust(UserId: number[]): Promise<SP[] | void> {
        let cust: SP[] = [];
        const service:any = await this.Repository.findAllSPWorkedWithCustInPast(UserId);
        if(service) {
            if(service.length > 0) {
                for(let s in service) {
                    const user = await this.Repository.findByUId(service[s].UserId!);
                    if(user) {
                        cust.push({
                            id: user.id,
                            Name: user.FirstName + " " + user.LastName,
                            Avatar: user.UserProfilePicture,
                            Email: user.Email,
                            ZipCode: user.Zipcode
                        })
                    }
                }
            }
        }
        const userId = cust.map(o => o.id)
        const users = cust.filter(({id }, index) => !userId.includes(id, index+1))
        return users;
    };

}