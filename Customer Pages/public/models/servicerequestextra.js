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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SRExtraModelAttributes = exports.SRExtra = void 0;
var sequelize_1 = require("sequelize");
var SRExtra = /** @class */ (function (_super) {
    __extends(SRExtra, _super);
    function SRExtra() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SRExtra;
}(sequelize_1.Model));
exports.SRExtra = SRExtra;
exports.SRExtraModelAttributes = {
    ServiceRequestExtraId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    ServiceRequestId: {
        allowNull: false,
        references: {
            model: 'ServiceRequest',
            key: 'ServiceRequestId'
        },
        type: sequelize_1.DataTypes.INTEGER
    },
    ServiceExtraId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
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
