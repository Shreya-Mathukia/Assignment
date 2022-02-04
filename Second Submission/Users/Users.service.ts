import { Json } from "sequelize/dist/lib/utils";
import { User } from "../models/user";
import { UsersRepository } from "./Users.repository";

export class UsersService {
    public constructor(private readonly usersRepository: UsersRepository) {
        this.usersRepository = usersRepository;
    }

    public async getUsersById(userId: number): Promise<User | null> {
        return this.usersRepository.getUsersById(userId);
    }
    

    public async getUsers(): Promise<User[]> {
        return this.usersRepository.getUsers();
    }

    

    public async updateUsers(users: User, userId: number): Promise<[number, User[]]> {
        return this.usersRepository.updateUsers(users, userId);
    }

    public async deleteUsers(userId: number): Promise<number> {
        return this.usersRepository.deleteUsers(userId);
    }
}