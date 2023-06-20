import express, { Router } from 'express';
import {
  insert,
  read,
  readById,
  update,
  deleteEmployee,
} from '../controllers/employeeController';

import {auth} from "../middleware/auth"


const employeeRouter: Router = express.Router();

employeeRouter.post('/login/employee',auth,insert); 
employeeRouter.get('/employees', auth,read);
employeeRouter.get('/employees/:id', auth, readById);
employeeRouter.put('/employee/:id', auth, update);
employeeRouter.delete('/employee/:id', auth, deleteEmployee);

export default employeeRouter;
