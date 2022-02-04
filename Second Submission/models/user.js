"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.UsersModelAttributes = exports.User = void 0;
var sequelize_1 = require("sequelize");
var User = /** @class */ (function (_super) {
    __extends(User, _super);
    function User() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return User;
}(sequelize_1.Model));
exports.User = User;
;
exports.UsersModelAttributes = {
    id: {
        autoIncrement: true,
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
        primaryKey: true
    },
    FirstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    Password: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    Mobile: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    RoleId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    IsRegisteredUser: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false
    },
    createdAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    updatedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
};
