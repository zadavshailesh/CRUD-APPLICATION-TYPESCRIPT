import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../model/userModel';

const SECRET_KEY = '174F3C3EF569F';

const register = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    const alreadyUser = await User.findOne({ where: { username } });
    if (alreadyUser) {
      res.status(409).json({ message: 'User already exists' });
      return;
    }

    const user = await User.create({ username, password });
    res.json({ message: 'Registration successful', user });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username } });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }
    if (user.password !== password) {
      res.status(401).json({ message: 'Invalid password' });
      return;
    }
    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.json({ message: 'Login successful!!', token });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: 'Unauthorized user' });
      return;
    }

    const tokenWithoutBearer = token.split(' ')[1]; 
    const decoded = jwt.verify(tokenWithoutBearer, SECRET_KEY) as { id:string };
    // console.log(decoded);
    const user = await User.findOne({ where: { id: decoded.id } });

    if (!user) {
      res.status(401).json({ message: 'Unauthorized user' });
      return;
    }

    next();
  } catch (error: any) {
    res.status(401).json({ message: 'Unauthorized user' });
  }
};

export { register, login, auth };
