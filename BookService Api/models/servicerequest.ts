import { Model, DataTypes, ModelAttributes, DecimalDataType } from 'sequelize';

export class ServiceRequest extends Model{

    ServiceRequestId!:number;
    UserId!: number;
    ServiceId!: number;
    ServiceStartDat!:Date;
    ZipCode!:string;
    ServiceHourlyRate!: number;
    ServiceHours!:number;
    ExtraHours!:number;
    SubTotal!: number;
    Discount!: number;
    TotalCost!: number;
    Comments!: string;
    PaymentTransactionRefNo!: string;
    PaymentDue!: boolean ;
    ServiceProviderId!: number;
    SPAcceptedDat!: Date;
    HasPets!: boolean;
    Status!: number;
    ModifiedBy!: number;
    RefundedAmount!: number;
    Distance!: number;
    HasIssue!: boolean;
    PaymentDone!: boolean;
    RecordVersion!:number ;
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
        type: DataTypes.DATE
      },
      ZipCode: {
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
      SubTotal: {
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
        allowNull: false,
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
        type: DataTypes.INTEGER
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
      HasIssue: {
        type: DataTypes.BOOLEAN
      },
      PaymentDone: {
        type: DataTypes.BOOLEAN
      },
      RecordVersion: {
        type: DataTypes.UUID
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