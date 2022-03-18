import { Model, DataTypes, ModelAttributes, DecimalDataType } from 'sequelize';

export class ServiceRequest extends Model{

    ServiceRequestId!:number;
    UserId!: number;
    ServiceId!: number;
    ServiceStartDate!:Date;
    Zipcode!:string;
    ServiceHourlyRate!: number;
    ServiceHours!:number;
    ExtraHours!:number;
    Subtotal!: number;
    Discount!: number;
    TotalCost!: number;
    Comments!: string;
    PaymentTransactionRefNo!: string;
    PaymentDue!: boolean ;
    ServiceProviderId!: number;
    SPAcceptedDat!: Date;
    HasPets!: boolean;
    Status!: boolean;
    ModifiedBy!: number;
    RefundedAmount!: number;
    Distance!: number;
    HasIssues!: boolean;
    PaymentDone!: boolean;
    RecordVersion!:number ;
    ServiceStartTime!: Date;
}

export const ServiceRequestModelAttributes:ModelAttributes = {
    ServiceRequestId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      UserId: {
       type: DataTypes.INTEGER,
        allowNull: false
        },
      ServiceId: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      ServiceStartDate: {
        allowNull: false,
        type: DataTypes.DATEONLY
      },
      Zipcode: {
        allowNull: false,
        type: DataTypes.STRING
      },
      ServiceHourlyRate: {
        type: DataTypes.DECIMAL
      },
      ServiceHours: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      ExtraHours: {
        type: DataTypes.FLOAT
      },
      Subtotal: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
      Discount: {
        type: DataTypes.DECIMAL
      },
      TotalCost: {
        allowNull: false,
        type: DataTypes.DECIMAL
      },
      Comments: {
        type: DataTypes.STRING
      },
      PaymentTransactionRefNo: {
        type: DataTypes.STRING
      },
      PaymentDue: {
            type: DataTypes.BOOLEAN
      },
       ServiceProviderId: {
           type: DataTypes.INTEGER
       },
      SPAcceptedDate: {
        type: DataTypes.DATE
      },
      HasPets: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      Status: {
        type: DataTypes.BOOLEAN
      },
      ModifiedBy: {
        type: DataTypes.INTEGER
      },
      RefundedAmount: {
        type: DataTypes.DECIMAL
      },
      Distance: {
        type: DataTypes.DECIMAL
      },
      HasIssues: {
        type: DataTypes.BOOLEAN
      },
      PaymentDone: {
        type: DataTypes.BOOLEAN
      },
      RecordVersion: {
        type: DataTypes.UUID
      },
      ServiceStartTime: {
        type: DataTypes.TIME
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