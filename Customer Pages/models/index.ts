
import { BuildOptions, Model, Sequelize } from 'sequelize';
import { User, UsersModelAttributes } from "./user";
import { ContactUs, ContactusModelAttributes } from "./contactus"
import { UserAddress, UserAddressModelAttributes } from './useraddress';
import { ServiceRequestModelAttributes, ServiceRequest } from './servicerequest';
import { SRAddress, SRAddressModelAttributes } from "./servicerequestaddress";
import { SRExtra, SRExtraModelAttributes } from "./servicerequestextra";
import { FavoriteAndBlocked, FAndBModelAttributes } from "./favoriteandblocked";
import { ratingModelAttributes,rating } from './rating';



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

type UserAddressModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserAddress;
};

const UserAddressDefineModel = sequelize.define(
  'UserAddress',
  {
    ...UserAddressModelAttributes
  },
  {
    tableName: 'UserAddress'
  }
) as UserAddressModelStatic;

type ServiceRequestModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): ServiceRequest;
};

const ServiceRequestDefineModel = sequelize.define(
  'ServiceRequest',
  {
    ...ServiceRequestModelAttributes
  },
  {
    tableName: 'ServiceRequest'
  }
) as ServiceRequestModelStatic;

type SRAddressModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SRAddress;
};

const SRAddressDefineModel = sequelize.define(
  "SRAddress",
  {
    ...SRAddressModelAttributes,
  },
  {
    tableName: "ServiceRequestAddress",
  }
) as SRAddressModelStatic;


type SRExtraModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): SRExtra;
};

const SRExtraDefineModel = sequelize.define(
  "SRExtra",
  {
    ...SRExtraModelAttributes,
  },
  {
    tableName: "SRExtra",
  }
) as SRExtraModelStatic;

type FAndBModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): FavoriteAndBlocked;
};

const FAndBDefineModel = sequelize.define(
  "FavoriteAndBlocked",
  {
    ...FAndBModelAttributes,
  },
  {
    tableName: "FavoriteAndBlocked",
  }
) as FAndBModelStatic;

type ratingModelStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): rating;
};

const ratingDefineModel = sequelize.define(
  "rating",
  {
    ...ratingModelAttributes,
  },
  {
    tableName: "ratings",
  }
) as ratingModelStatic;


export interface DbContext {
  sequelize: Sequelize;
  Users: UsersModelStatic;
  Contactus: ContactusModelStatic;
  UserAddress: UserAddressModelStatic;
  ServiceRequest: ServiceRequestModelStatic;
  SRAddress: SRAddressModelStatic;
  SRExtra: SRExtraModelStatic;
  FavoriteAndBlocked: FAndBModelStatic;
  rating: ratingModelStatic
}

export const db: DbContext = {
  sequelize: sequelize,
  Users: UsersDefineModel,
  Contactus: ContactusDefineModel,
  UserAddress: UserAddressDefineModel,
  ServiceRequest: ServiceRequestDefineModel,
  SRAddress: SRAddressDefineModel,
  SRExtra: SRExtraDefineModel,
  FavoriteAndBlocked: FAndBDefineModel,
  rating: ratingDefineModel

}


db.Users.hasMany(db.UserAddress, {
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});
db.UserAddress.belongsTo(db.Users, {
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});

db.ServiceRequest.hasOne(db.SRAddress, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});
db.SRAddress.belongsTo(db.ServiceRequest, {foreignKey: {
  name: "ServiceRequestId",
  allowNull: false,
},
constraints: true,
onDelete: "CASCADE",});

db.ServiceRequest.belongsTo(db.Users,{
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});
db.Users.hasMany(db.ServiceRequest,{
  foreignKey: {
    name: "UserId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});
db.ServiceRequest.belongsTo(db.Users,{
  foreignKey: {
    name: "ServiceProviderId",
    allowNull: true,
  },
  constraints: true,
  onDelete: "CASCADE",
});
db.Users.hasMany(db.ServiceRequest,{
  foreignKey: {
    name: "ServiceProviderId",
    allowNull: true,
  },
  constraints: true,
  onDelete: "CASCADE",
});


db.rating.hasOne(db.ServiceRequest, {
  foreignKey: {
    name: "ServiceRequestId",
    allowNull: false,
  },
  constraints: true,
  onDelete: "CASCADE",
});
db.ServiceRequest.belongsTo(db.rating, {foreignKey: {
  name: "ServiceRequestId",
  allowNull: false,
},
constraints: true,
onDelete: "CASCADE",});

export default db;