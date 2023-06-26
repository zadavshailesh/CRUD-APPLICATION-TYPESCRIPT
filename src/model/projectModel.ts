import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Employee from '../model/employeeModel';
import EmployeesPerProjects from './linkModel';


class Project extends Model {
  public projectid!: number;
  public code!: string;
  public name!: string;
  public description!: string;


}

Project.init(
  {
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'project',
    timestamps: false,
  }
);

export default Project;
