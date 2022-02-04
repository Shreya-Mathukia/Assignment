import express from 'express';
import { Json } from "sequelize/dist/lib/utils";
import  {db} from "../models/index";
import { User } from "../models/user";
import bycryptjs from 'bcryptjs';





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
           RoleId: 1,
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

public async login(users: User): Promise<User | null>  {
    const {Email, Password}= users;
    let data = db.Users.findOne({ where: {Email: Email} });
    let hashedPassword = db.Users.findOne({attributes: ['Password'] , where: {Email: Email}});
    if(data != null){              
        console.log(hashedPassword);
     
}

    return data;
}
}