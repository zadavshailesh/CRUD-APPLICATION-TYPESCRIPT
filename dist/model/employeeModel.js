"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Employee extends sequelize_1.Model {
}
Employee.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    age: {
        type: sequelize_1.DataTypes.INTEGER,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: 'employee',
    timestamps: false
});
exports.default = Employee;
