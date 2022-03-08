import express from 'express';
import { Json } from "sequelize/dist/lib/utils";
import  {db} from "../models/index";
import { User } from "../models/user";
import bycryptjs from 'bcryptjs';
import { EmailOptions } from 'joi';





export class loginRepository{
public async createCustomer(users: User): Promise<User> {
    const { FirstName,LastName,Email,Password,Mobile } =  users;
    bycryptjs.hash(Password,10,(err,hash) => {
        if (err) { 
            console.log('hashing error');
        }
        const value=hash;
        return db.Users.create({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
           Password: value,
           Mobile: Mobile ,
           RoleId: 3,
           IsRegisteredUser: true
          });
    });
return users;
}

public async createServiceProvider(users: User): Promise<User> {
    const { FirstName,LastName,Email,Password,Mobile } =  users;
    bycryptjs.hash(Password,10,(err,hash) => {
        if (err) { 
            console.log('hashing error');
        }
        const value=hash;
        return db.Users.create({
            FirstName: FirstName,
            LastName: LastName,
            Email: Email,
           Password: value,
           Mobile: Mobile ,
           RoleId: 2,
           IsRegisteredUser: true
          });
    });
return users;
}

public async getUserByEmail(Email: string){
    
    return db.Users.findOne({ where: {Email: Email} });
}



}