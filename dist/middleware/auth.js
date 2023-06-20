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
exports.auth = exports.login = exports.register = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../model/userModel"));
const SECRET_KEY = '174F3C3EF569F';
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const alreadyUser = yield userModel_1.default.findOne({ where: { username } });
        if (alreadyUser) {
            res.status(409).json({ message: 'User already exists' });
            return;
        }
        const user = yield userModel_1.default.create({ username, password });
        res.json({ message: 'Registration successful', user });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield userModel_1.default.findOne({ where: { username } });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
            return;
        }
        if (user.password !== password) {
            res.status(401).json({ message: 'Invalid password' });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
        res.json({ message: 'Login successful!!', token });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.login = login;
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.headers.authorization;
        if (!token) {
            res.status(401).json({ message: 'Unauthorized user' });
            return;
        }
        const tokenWithoutBearer = token.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(tokenWithoutBearer, SECRET_KEY);
        console.log(decoded);
        const user = yield userModel_1.default.findOne({ where: { id: decoded.id } });
        if (!user) {
            res.status(401).json({ message: 'Unauthorized user' });
            return;
        }
        next();
    }
    catch (error) {
        res.status(401).json({ message: 'Unauthorized user' });
    }
});
exports.auth = auth;
