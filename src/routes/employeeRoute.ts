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
employeeRouter.get('/employees', read);
employeeRouter.get('/employees/:id', readById);
employeeRouter.put('/employee/:id', update);
employeeRouter.delete('/employee/:id', deleteEmployee);

export default employeeRouter;
