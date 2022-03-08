import { Request, Response , NextFunction} from 'express';
import { User } from "../models/user";
import { loginService } from "./Login.Service";
import bcrypt from 'bcryptjs';
import dotenv from "dotenv";
dotenv.config();
const jwt = require('jsonwebtoken');


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
    return this.loginService.getUserByEmail(req.body.Email).then((user: User | null | any) =>{
      if(!user){
        return res.status(404).json('Sign Up first');
      }

      else{
          bcrypt.compare(req.body.Password, user.Password).then(async (doMatch:  any) => {
              if(doMatch){
                const token = this.loginService.generateToken(user.Email!);
              return this.loginService.getUserByEmail(req.body.Email).then((user: User | null) => {
              if( user?.RoleId == '3'){
                return res.status(200).cookie("token", token, { httpOnly: true, expires: new Date(Date.now()+600000) }).json({
                   message: "Login successfully , Hello Customer"
                   })
              }
              else if( user?.RoleId == '2'){
                return res.status(200).cookie("token", token, { httpOnly: true, expires: new Date(Date.now()+600000) }).json({
                   message: "Login successfully , Hello Helper" });
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
    }).catch((error: Error) => {console.log(error); return res.status(500).json({ error: error });
  });
  };

  public validateToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | undefined> => {
    const token = req.headers.authorization;
    if(token == null) {
      return res.status(401).json("Invalid  credentials!");
    }
    jwt.verify(token!, process.env.SECRET_KEY!, (error: any, decodedToken: any) => {
      if(error) {
        return res.status(400).json("Invalid login credentials!!");
      }
      
      const Email = decodedToken.Email;
      console.log(Email);
      if(Email){
        return this.loginService
          .getUserByEmail(Email)
          .then((user) => {
            if(user === null) {
              return res.status(404).json("User not found!");
            }
            else {
              next();
            }
          })
          .catch((error: Error) => {
            console.log(error);
            return res.status(500).json({ error });
          });
        }
    });
  };

  public logout = async (req: Request, res: Response): Promise<Response> => {
    try {
      res.clearCookie('token');
      return res.status(200).json("You Logged Out Successfully!");
    }
    catch(error) {
      return res.status(401).json("Log Out Process Failed!");
    }
  }; 

  
  
}
