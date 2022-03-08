
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class Zipcode extends Model {
  ZipcodeId!: number;
  
  CityId!:number;

  ZipcodeValue!: String;

};

export const ZipcodeModelAttributes: ModelAttributes = {
  ZipcodeId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  ZipcodeValue: {
    allowNull: false,  
    type: DataTypes.STRING
  },
  CityId: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}