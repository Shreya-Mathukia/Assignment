
import { Model, DataTypes, ModelAttributes } from 'sequelize';

export class State extends Model{

  StateId!: number;
  StateName!: string;
    

}

export const StateModelAttributes: ModelAttributes = {
    StateId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      StateName: {
        allowNull: false,
        type: DataTypes.STRING
      }
}