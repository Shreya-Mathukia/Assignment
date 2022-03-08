"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.sequelize = exports.Sequelize = void 0;
var sequelize_1 = require("sequelize");
Object.defineProperty(exports, "Sequelize", { enumerable: true, get: function () { return sequelize_1.Sequelize; } });
var user_1 = require("./user");
var contactus_1 = require("./contactus");
var useraddress_1 = require("./useraddress");
var servicerequest_1 = require("./servicerequest");
var servicerequestaddress_1 = require("./servicerequestaddress");
var servicerequestextra_1 = require("./servicerequestextra");
var favoriteandblocked_1 = require("./favoriteandblocked");
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.js')[env];
var sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
var UsersDefineModel = sequelize.define('Users', __assign({}, user_1.UsersModelAttributes), {
    tableName: 'users'
});
var ContactusDefineModel = sequelize.define('Contactus', __assign({}, contactus_1.ContactusModelAttributes), {
    tableName: 'ContactUs'
});
var UserAddressDefineModel = sequelize.define('UserAddress', __assign({}, useraddress_1.UserAddressModelAttributes), {
    tableName: 'UserAddress'
});
var ServiceRequestDefineModel = sequelize.define('ServiceRequest', __assign({}, servicerequest_1.ServiceRequestModelAttributes), {
    tableName: 'ServiceRequest'
});
var SRAddressDefineModel = sequelize.define("SRAddress", __assign({}, servicerequestaddress_1.SRAddressModelAttributes), {
    tableName: "ServiceRequestAddress",
});
var SRExtraDefineModel = sequelize.define("SRExtra", __assign({}, servicerequestextra_1.SRExtraModelAttributes), {
    tableName: "SRExtra",
});
var FAndBDefineModel = sequelize.define("FavoriteAndBlocked", __assign({}, favoriteandblocked_1.FAndBModelAttributes), {
    tableName: "FavoriteAndBlocked",
});
exports.db = {
    sequelize: sequelize,
    Users: UsersDefineModel,
    Contactus: ContactusDefineModel,
    UserAddress: UserAddressDefineModel,
    ServiceRequest: ServiceRequestDefineModel,
    SRAddress: SRAddressDefineModel,
    SRExtra: SRExtraDefineModel,
    FavoriteAndBlocked: FAndBDefineModel,
};
exports.db.Users.hasMany(exports.db.UserAddress, {
    foreignKey: {
        name: "UserId",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.UserAddress.belongsTo(exports.db.Users, {
    foreignKey: {
        name: "UserId",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequest.hasOne(exports.db.SRAddress, {
    foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.SRAddress.belongsTo(exports.db.ServiceRequest, { foreignKey: {
        name: "ServiceRequestId",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE", });
exports.db.ServiceRequest.belongsTo(exports.db.Users, {
    foreignKey: {
        name: "UserId",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Users.hasMany(exports.db.ServiceRequest, {
    foreignKey: {
        name: "UserId",
        allowNull: false,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.ServiceRequest.belongsTo(exports.db.Users, {
    foreignKey: {
        name: "ServiceProviderId",
        allowNull: true,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.db.Users.hasMany(exports.db.ServiceRequest, {
    foreignKey: {
        name: "ServiceProviderId",
        allowNull: true,
    },
    constraints: true,
    onDelete: "CASCADE",
});
exports.default = exports.db;
