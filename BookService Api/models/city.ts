
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class City extends Model {
  Cityid!: number;
  
  StateId!:number;

  CityName!: String;

};

export const CityModelAttributes: ModelAttributes = {
  CityId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  CityName: {
    allowNull: false,  
    type: DataTypes.STRING
  },
  StateId: {
    allowNull: false,
    type: DataTypes.INTEGER
  }
}