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


/**
 * @swagger
 * /employees/{id}:
 *   get:
 *     summary: Get employee details by ID
 *     description: Get employee details and projects based on the Employee ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *             schema:
 *               $ref: '#/components/schemas/{EmployeesDetails}'
 */
employeeRouter.get('/employees/:id', readById);



/**
 * @swagger
 * /employee/{id}:
 *   put:
 *     summary: Update employee details by ID
 *     description: Update employee details and employees_per_projects based on the Employee ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the employee
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/EmployeeUpdateResponse'
 *     responses:
 *       200:
 *             schema:
 *               $ref: '#/components/schemas/EmployeeUpdateResponse'
 */

employeeRouter.put('/employee/:id', update);








// employeeRouter.put('/employee/:id/project/:projectId', updateByProjectId);
employeeRouter.delete('/employee/:id', deleteEmployee);

export default employeeRouter;
