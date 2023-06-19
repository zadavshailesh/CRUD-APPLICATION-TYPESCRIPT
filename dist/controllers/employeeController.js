"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.update = exports.readById = exports.read = exports.insert = void 0;
const employeeModel_1 = __importDefault(require("../model/employeeModel"));
// CREATE
const insert = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, age, address } = req.body;
        const employeeData = yield employeeModel_1.default.create({ name, age, address });
        res.json({ message: 'Employee Created successfully!!', employeeData });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.insert = insert;
// READ
const read = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const employeeData = yield employeeModel_1.default.findAll();
        res.json(employeeData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.read = read;
// READ BY ID
const readById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const employeeData = yield employeeModel_1.default.findByPk(id);
        res.json(employeeData);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.readById = readById;
// UPDATE
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { name, age, address } = req.body;
        const [, employeeData] = yield employeeModel_1.default.update({ name, age, address }, { where: { id }, returning: true });
        res.json({ message: 'Employee updated successfully!!', employeeData });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.update = update;
// DELETE
const deleteEmployee = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const employeeData = yield employeeModel_1.default.destroy({ where: { id } });
        res.json({ message: 'Employee deleted successfully', employeeData });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteEmployee = deleteEmployee;
