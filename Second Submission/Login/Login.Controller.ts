import { Request, Response } from 'express';
import { User } from "../models/user";
import { loginService } from "./Login.Service";
import bcrypt from 'bcryptjs';
import { UserSchema } from '../Users/Users.model';

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
      .catch((error: Error) => { return res.status(500).json({ error: error });
      });
  };

  public login = async (req: Request, res: Response): Promise<Response | void> => {
    return this.loginService.login(req.body).then((user: User | null | any) =>{
      if(!user){
        return res.status(404).json('Sign Up first');
      }

      else{
          bcrypt.compare(req.body.Password, user.Password).then(async (doMatch:  any) => {
              if(doMatch){
              return this.loginService.login(req.body).then((user: User | null) => {
              if( user?.RoleId == '1'){
                return res.status(200).json('Hello customer you have logged in.')
              }
              else if( user?.RoleId == '2'){
                return res.status(200).json('Hello service provider');
              }           
            }            
            ).catch((error: Error) => { return res.status(500).json({ error: error });
          });
          }     
          else{
            return res.status(404).json('Invalid Password');
          } }     
          ).catch((error: Error) => { return res.status(500).json({ error: error });
        });
      }
    }).catch((error: Error) => { return res.status(500).json({ error: error });
  });
  };

  

  
  
}
