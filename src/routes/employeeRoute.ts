import express, { Router } from 'express';
import {
  insert,
  read,
  readById,
  update,
  // updateByProjectId,
  deleteEmployee
} from '../controllers/employeeController';

import {auth} from "../middleware/auth"


const employeeRouter: Router = express.Router();

employeeRouter.post('/login/employee',auth,insert); 

employeeRouter.get('/employees',read);
employeeRouter.get('/employees/:id',auth,readById);
employeeRouter.put('/employee/:id',auth,update);
// employeeRouter.put('/employee/:id/project/:projectId', updateByProjectId);
employeeRouter.delete('/employee/:id', deleteEmployee);

export default employeeRouter;
