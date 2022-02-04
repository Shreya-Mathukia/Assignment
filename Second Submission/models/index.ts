
import { BuildOptions, Model, Sequelize } from 'sequelize';
import { User, UsersModelAttributes } from "./user";
import { ContactUs, ContactusModelAttributes } from "./contactus"


const env = process.env.NODE_ENV || 'development';

const config = require('../config/config.js')[env];

const  sequelize = config.url
  ? new Sequelize(config.url, config)
  : new Sequelize(config.database, config.username, config.password, config);

export { Sequelize, sequelize };

type UsersModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): User;
};

const UsersDefineModel = sequelize.define(
  'Users',
  {
    ...UsersModelAttributes
  },
  {
    tableName: 'users'
  }
) as UsersModelStatic;

type ContactusModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ContactUs;
};


const ContactusDefineModel = sequelize.define(
  'Contactus',
  {
    ...ContactusModelAttributes
  },
  {
    tableName: 'ContactUs'
  }
) as ContactusModelStatic;


export interface DbContext {
  sequelize: Sequelize;
  Users: UsersModelStatic;
  Contactus: ContactusModelStatic;
  
}

export const db: DbContext = {
  sequelize: sequelize,
  Users: UsersDefineModel,
  Contactus: ContactusDefineModel,

}
export {UsersDefineModel};

