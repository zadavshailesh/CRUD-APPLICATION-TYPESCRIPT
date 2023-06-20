"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = require("../middleware/auth");
const userRouter = express_1.default.Router();
userRouter.post('/register', auth_1.register);
userRouter.post('/login', auth_1.login);
exports.default = userRouter;
