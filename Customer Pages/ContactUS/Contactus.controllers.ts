import { Request, Response } from 'express';
import { ContactUs } from "../models/contactus";
import { ContactusService } from "./Contactus.service";

export class ContactusController {
  public constructor(private readonly ContactusService: ContactusService) {
    this.ContactusService = ContactusService;
  }

  public getAll = async (req: Request, res: Response): Promise<Response> => {
    return this.ContactusService
      .getAll()
      .then((a: ContactUs[]) => {
        return res.status(200).json({ a });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public createUsers = async (req: Request, res: Response): Promise<Response> => {
    return this.ContactusService
      .createUsers(req.body)
      .then((a: ContactUs) => {
        return res.status(200).json({ request:a, Message:"Request Created Success."  });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      
      });
  };

  public getById = async (req: Request, res: Response): Promise<Response> => {
    return this.ContactusService
      .getById(+req.params.id)
      .then((a) => {
        if (a) {
          return res.status(200).json({ a });
        }
        return res.status(404).json({ error: 'NotFound' });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };
  
  
}
