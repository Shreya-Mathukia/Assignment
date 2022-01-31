import  {db} from "../models/index";
import { ContactUs } from "../models/contactus";

export class ContactusRepository {
    public async getById(id: number): Promise<ContactUs | null> {
        return db.Contactus.findOne({ where: {id: id}});
    }

    public async getAll(): Promise<ContactUs[]> {
        return db.Contactus.findAll();
    }

    public async createUsers(a: ContactUs): Promise<ContactUs> {
        return db.Contactus.create(a);
    }
    
}
