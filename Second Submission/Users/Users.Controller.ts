import { Request, Response } from 'express';
import { User } from "../models/user";
import { UsersService } from "./Users.service";

export class UsersController {
  public constructor(private readonly usersService: UsersService) {
    this.usersService = usersService;
  }

  public getUsers = async (req: Request, res: Response): Promise<Response> => {
    return this.usersService
      .getUsers()
      .then((user: User[]) => {
        return res.status(200).json({ user });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

   public getUsersById = async (req: Request, res: Response): Promise<Response> => {
    return this.usersService
      .getUsersById(+req.params.id)
      .then((user) => {
        if (user) {
          return res.status(200).json({ user });
        }
        return res.status(404).json({ error: 'NotFound' });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public updateUsers = async (req: Request, res: Response): Promise<Response> => {
    return this.usersService
      .updateUsers(req.body,+req.params.id)
      .then((user) => {
          return res.status(200).json({ user });
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public deleteUsers = async (req: Request, res: Response): Promise<Response> => {
    return this.usersService
      .deleteUsers(+req.params.id)
      .then((user) => {
        if (user > 0) {
          return res.status(200).json({ user });
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
