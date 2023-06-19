"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employeeController_1 = require("../controllers/employeeController");
const employeeRouter = express_1.default.Router();
employeeRouter.post('/employee', employeeController_1.insert);
employeeRouter.get('/employees', employeeController_1.read);
employeeRouter.get('/employees/:id', employeeController_1.readById);
employeeRouter.put('/employee/:id', employeeController_1.update);
employeeRouter.delete('/employee/:id', employeeController_1.deleteEmployee);
exports.default = employeeRouter;
