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
exports.CityModelAttributes = exports.City = void 0;
var sequelize_1 = require("sequelize");
var City = /** @class */ (function (_super) {
    __extends(City, _super);
    function City() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return City;
}(sequelize_1.Model));
exports.City = City;
;
exports.CityModelAttributes = {
    CityId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: sequelize_1.DataTypes.INTEGER
    },
    CityName: {
        allowNull: false,
        type: sequelize_1.DataTypes.STRING
    },
    StateId: {
        allowNull: false,
        type: sequelize_1.DataTypes.INTEGER
    }
};
