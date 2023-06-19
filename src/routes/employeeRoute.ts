import express, { Router } from 'express';
import {
  insert,
  read,
  readById,
  update,
  deleteEmployee,
} from '../controllers/employeeController';

const employeeRouter: Router = express.Router();


employeeRouter.post('/employee', insert); 
employeeRouter.get('/employees', read); 
employeeRouter.get('/employees/:id', readById); 
employeeRouter.put('/employee/:id', update); 
employeeRouter.delete('/employee/:id', deleteEmployee); 

export default employeeRouter;
