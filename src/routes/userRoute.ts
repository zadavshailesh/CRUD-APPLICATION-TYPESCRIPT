import express, { Router } from 'express';
import { register, login,forgotPassword, updatePassword } from '../middleware/auth';

const userRouter: Router = express.Router();

userRouter.post('/register', register);

userRouter.post('/login', login);

userRouter.post('/forget',forgotPassword);

userRouter.put('/update',updatePassword);


export default userRouter;
