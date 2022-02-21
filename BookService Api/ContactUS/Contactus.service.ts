import { ContactUs } from "../models/contactus";
import { ContactusRepository } from "./Contactus.repository";

export class ContactusService {
    public constructor(private readonly ContactusRepository: ContactusRepository) {
        this.ContactusRepository = ContactusRepository;
    }

    public async getById(id: number): Promise<ContactUs | null> {
        return this.ContactusRepository.getById(id);
    }

    public async getAll(): Promise<ContactUs[]> {
        return this.ContactusRepository.getAll();
    }

    public async createUsers(entry: ContactUs): Promise<ContactUs> {
        return this.ContactusRepository.createUsers(entry);
    }

    
}