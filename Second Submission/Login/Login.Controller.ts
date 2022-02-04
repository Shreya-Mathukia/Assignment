import { Request, Response } from 'express';
import { User } from "../models/user";
import { loginService } from "./Login.Service";

export class loginController {
  public constructor(private readonly loginService: loginService) {
    this.loginService = loginService;
  }

  public createCustomer = async (req: Request, res: Response): Promise<Response> => {
    return this.loginService
      .createCustomer(req.body)
      .then((user: User) => {
        return res.status(200).json('Customer Created!!');
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public createServiceProvider = async (req: Request, res: Response): Promise<Response> => {
    return this.loginService
      .createServiceProvider(req.body)
      .then((user: User) => {
        return res.status(200).json('Service Provider Created!');
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  public login = async (req: Request, res: Response): Promise<Response> => {
    return this.loginService
      .login(req.body)
      .then((user) => {
        if (user) {
          if(user.RoleId == '1')
          return res.status(200).json('Hello Customer');
          else
          return res.status(200).json('Hello Service Provider');          
        }
        return res.json( 'Invalid' );
      })
      .catch((error: Error) => {
        return res.status(500).json({
          error: error
        });
      });
  };

  

  
  
}
