import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class User extends Model {
  public id!: number;
  public username!: string;
  public password!: string;
  public resetPasswordToken!:string | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resetPasswordToken:{
      type:DataTypes.STRING,
      allowNull:true,
    }
  },
  
  {
    sequelize,
    modelName: 'user',
    timestamps:false
  }
);
export default User;
