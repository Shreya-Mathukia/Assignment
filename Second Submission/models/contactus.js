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
exports.ContactusModelAttributes = exports.ContactUs = void 0;
var sequelize_1 = require("sequelize");
var ContactUs = /** @class */ (function (_super) {
    __extends(ContactUs, _super);
    function ContactUs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ContactUs;
}(sequelize_1.Model));
exports.ContactUs = ContactUs;
;
exports.ContactusModelAttributes = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    FirstName: {
        type: sequelize_1.DataTypes.STRING
    },
    LastName: {
        type: sequelize_1.DataTypes.STRING
    },
    Email: {
        type: sequelize_1.DataTypes.STRING
    },
    Mobile: {
        type: sequelize_1.DataTypes.STRING
    },
    Subject: {
        type: sequelize_1.DataTypes.STRING
    },
    Message: {
        type: sequelize_1.DataTypes.STRING
    },
    UploadFileName: {
        type: sequelize_1.DataTypes.STRING
    },
    createdAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    },
    updatedAt: {
        allowNull: false,
        type: sequelize_1.DataTypes.DATE
    }
};
