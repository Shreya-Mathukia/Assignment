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
exports.__esModule = true;
exports.UsersDefineModel = exports.db = exports.sequelize = exports.Sequelize = void 0;
var sequelize_1 = require("sequelize");
exports.Sequelize = sequelize_1.Sequelize;
var user_1 = require("./user");
var contactus_1 = require("./contactus");
var env = process.env.NODE_ENV || 'development';
var config = require('../config/config.js')[env];
var sequelize = config.url
    ? new sequelize_1.Sequelize(config.url, config)
    : new sequelize_1.Sequelize(config.database, config.username, config.password, config);
exports.sequelize = sequelize;
var UsersDefineModel = sequelize.define('Users', __assign({}, user_1.UsersModelAttributes), {
    tableName: 'users'
});
exports.UsersDefineModel = UsersDefineModel;
var ContactusDefineModel = sequelize.define('Contactus', __assign({}, contactus_1.ContactusModelAttributes), {
    tableName: 'ContactUs'
});
exports.db = {
    sequelize: sequelize,
    Users: UsersDefineModel,
    Contactus: ContactusDefineModel
};
