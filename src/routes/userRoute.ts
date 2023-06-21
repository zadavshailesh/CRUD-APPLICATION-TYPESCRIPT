import express, { Router } from 'express';
import { register, login,forgotPassword, updatePassword, loginByOTP,verifyOTP } from '../middleware/auth';

const userRouter: Router = express.Router();

userRouter.post('/register', register);

userRouter.post('/login', login);

userRouter.post('/forget',forgotPassword);

userRouter.put('/update',updatePassword);

userRouter.post('/loginByOTP',loginByOTP)

userRouter.post('/verifyOTP',verifyOTP)


export default userRouter;
