import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';
import Employee from '../model/employeeModel';
import Project from '../model/projectModel';

class EmployeesPerProjects extends Model {
  public id!: number;
  public projectid!: number;
  public employeeid!: number;
  public position!:string;
}

EmployeesPerProjects.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    projectid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Project,
        key: 'projectid',
      },
    },
    employeeid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: Employee,
        key: 'id',
      },
    },
    position:{
      type:DataTypes.STRING,
      allowNull:true
    }
  },
  {
    sequelize,
    modelName: 'employees_per_projects',
    timestamps: false,
  }
);
// Employee.belongsToMany(Project, {
//   through: EmployeesPerProjects
// });
// Project.belongsToMany(Employee, {
//   through: EmployeesPerProjects
// });

export default EmployeesPerProjects;
