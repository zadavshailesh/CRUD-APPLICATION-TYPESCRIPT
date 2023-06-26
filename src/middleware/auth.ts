import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/userModel';
import bcrypt from 'bcrypt';
import nodemailer from 'nodemailer';
import speakeasy from 'speakeasy';
import qrcode from 'qrcode';


const SECRET_KEY = '174F3C3EF569F';

const sendResetPasswordMail = async (username: string, token: string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'zadavshailesh@gmail.com',
        pass: '',
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

// For Reset password
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

// For update Password using token
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

//Adding new User
const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const spassword = await securePassword(password);

    const alreadyUser = await User.findOne({ where: { username } });
    if (alreadyUser) {
      return res.status(409).json({ message: 'User already exists' });
    }
    const secretkey = speakeasy.generateSecret({length: 20}).base32;

    const user = await User.create({ username, password: spassword, secret: secretkey });
    res.json({ message: 'Registration successful', user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


//For Login without OTP
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


//For authentication
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



//For Random OTP
const sendOTPToEmail = async(username,OTP)=>{
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'zadavshailesh@gmail.com',
        pass: '',
      },
    });

    const mailOptions = {
      from: 'zadavshailesh@gmail.com',
      to: username,
      subject: 'Reset Password',
      html: `Your OTP for login is: ${OTP}`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email has been sent:', info.messageId);
  } catch (error:any) {
    console.log(error.message);
  }
};

const loginByOTP = async (req: Request, res: Response) => {
  var otp = Math.random();
  otp = otp * 1000000;
  otp = parseInt(otp.toString());
  const OTP = otp;

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
    await sendOTPToEmail(username, OTP);
    user.otp =OTP;
    await user.save();
   

    res.json({ message: 'OTP is send to your Gmail, Please verify!!'});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const verifyOTP = async (req: Request, res: Response) => {
  try {
    const { username,otp } = req.body;
    const user = await User.findOne({ where: { username } });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isOTPValid = otp.toString() === user.otp?.toString();

    if (!isOTPValid) {
      return res.status(401).json({ message: 'Invalid OTP' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};




//For totp Code 

//This funcion called inside getOTP
const sendOTP = async (otp: string, username:string) => {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: 'zadavshailesh@gmail.com',
        pass: '',
      },
    });

    const mailOptions = {
      from: 'zadavshailesh@gmail.com',
      to: username,
      subject: 'Reset Password',
      html: `<h2>Your Login OTP is:${otp}</h2>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email has been sent:', info.response);
  } catch (error:any) {
    console.log(error.message);
  }
};

//This funcion also called inside getOTP
const gererateOTP = async (secretKey:string) => {
  try {
      const OTP=speakeasy.totp({
        secret:secretKey,
        encoding:"base32",
      })
      return OTP;
  } catch (error) {
    console.log('Failed to generate QR code');
    return null;
  }
};


const getOTP = async (req: Request, res: Response) => {
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
    // const timestamp: number = (30-Math.floor((new Date().getTime()/1000.0%30)));

    const otp = await gererateOTP(user.secret); 
    await sendOTP(otp as string,username);

    res.json({ message: 'Please verify OTP sent to registered gmail '});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


const totpValidate = async (req: Request, res: Response) => {
  try {
    const { username, secret, otp } = req.body;

    const valid = speakeasy.totp.verify({
      secret: secret,
      encoding: 'base32',
      token: otp,
      window: 0,
    });

    if (!valid) {
      return res.status(200).json({ message: 'OTP is invalid' });
    }

    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful!!', token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};





export {
   register, 
   login, 
   forgotPassword, 
   auth, 
   updatePassword,
   sendOTPToEmail,
   loginByOTP,
   verifyOTP,
   getOTP,
   totpValidate
  };
