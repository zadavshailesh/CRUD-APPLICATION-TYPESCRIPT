import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Employee extends Model {
  public id!: number;
  public name!: string;
  public age!: number;
  public address!: string;
}

Employee.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    age: {
      type: DataTypes.INTEGER,
    },
    address: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: 'employee',
    timestamps:false
  }
);

export default Employee;

