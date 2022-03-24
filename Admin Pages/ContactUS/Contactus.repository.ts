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
        const { FirstName, LastName, Email, Mobile, Subject,Message, UploadFileName} = a;
        return db.Contactus.create({
            FirstName: FirstName,

            LastName: LastName,

            Email: Email,

            Mobile: Mobile,
  
            Subject:Subject,

            Message:Message,

            UploadFileName:UploadFileName,
        });
    }
    
}
