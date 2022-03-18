import { Model, DataTypes, ModelAttributes } from "sequelize";

export class rating extends Model {
  RatingId!: number;
  ServiceRequestId!: number;
  RatingFrom!: number;
  RatingTo!: number;
  Ratings!: number;
  Comments?: string;
  RatingDate!: Date;
  OnTimeArrival!: number;
  Friendly!: number;
  QualityOfService!: number;
}

export const ratingModelAttributes: ModelAttributes = {
  RatingId: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  ServiceRequestId: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  RatingFrom: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  RatingTo: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  Ratings: {
    allowNull: false,
    type: DataTypes.DECIMAL(2,1)
  },
  Comments: {
    type: DataTypes.STRING(2000)
  },
  RatingDate: {
    allowNull: false,
    type: DataTypes.DATE
  },
  OnTimeArrival: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  Friendly: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  QualityOfService: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  }
}