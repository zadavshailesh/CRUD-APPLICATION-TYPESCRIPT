"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const employeeRoute_1 = __importDefault(require("../src/routes/employeeRoute"));
const userRoute_1 = __importDefault(require("../src/routes/userRoute"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
// For routes
app.use('/', employeeRoute_1.default);
app.use('/', userRoute_1.default);
const port = Number(process.env.PORT) || 9000;
app.listen(port, () => {
    console.log(`Server is running at https://localhost ${port}`);
});
