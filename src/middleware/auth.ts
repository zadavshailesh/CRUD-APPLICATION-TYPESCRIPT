import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/userModel';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';

const SECRET_KEY = '174F3C3EF569F';

// For Reset password
const sendResetPasswordMail = async (username: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'zadavshailesh@gmail.com',
        pass: 'buaivyslogxjwylz',
      },
    });

    const mailOptions = {
      from: 'zadavshailesh@gmail.com',
      to: username,
      subject: 'Reset Password',
      html: `Please click <a href="http://localhost:5000/forget-password?token=${token}">here</a> to reset your password.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email has been sent:', info.response);
  } catch (error:any) {
    console.log(error.message);
  }
};

const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    user.resetPasswordToken = token;
    await user.save();

    await sendResetPasswordMail(username, token);

    res.json({ message: 'Password reset email sent' });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

const securePassword = async (password: string) => {
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    return passwordHash;
  } catch (error:any) {
    console.log(error.message);
  }
};

// For update Password

const updatePassword = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;
    const password = req.body.password;
    const spassword = await securePassword(password);

    if (!token) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const tokenValue = token.split(' ')[1];
    const decodedToken = jwt.verify(tokenValue, SECRET_KEY) as { id?: string };
    

    if (!decodedToken.id) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    const user: any = await User.findOne({ where: { id: decodedToken.id} });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.password = spassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const spassword = await securePassword(password);

    const alreadyUser = await User.findOne({ where: { username } });
    if (alreadyUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const user = await User.create({ username, password: spassword });
    res.json({ message: 'Registration successful', user });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error:any) {
    res.status(500).json({ error: error.message });
  }
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    const tokenWithoutBearer = token.split(' ')[1];
    const decoded = jwt.verify(tokenWithoutBearer, SECRET_KEY) as { id: string };
    console.log(decoded);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }

    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized user' });
  }
};

export { register, login, forgotPassword, auth, updatePassword };
