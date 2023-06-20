import express, { Router } from 'express';
import { register, login } from '../middleware/auth';

const userRouter: Router = express.Router();

userRouter.post('/register', register);

userRouter.post('/login', login);

export default userRouter;
