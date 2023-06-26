import { Request, Response } from 'express';
import Employee from '../model/employeeModel';
import Project from '../model/projectModel';
import EmployeesPerProjects from '../model/linkModel';

// CREATE
const insert = async (req: Request, res: Response) => {
  try {
    const { name, age, address } = req.body;
    const employeeData = await Employee.create({ name, age, address });
    res.json({ message: 'Employee created successfully!', employeeData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// READ
const read = async (req: Request, res: Response) => {
  try {
    const employeeData = await Employee.findAll();
    res.json(employeeData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// READ BY ID
const readById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employeeData = await Employee.findByPk(id);
    res.json(employeeData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, age, address, projects } = req.body;

    // Update the employee
    const [, [updatedEmployeeData]] = await Employee.update(
      { name, age, address },
      { where: { id }, returning: true }
    );

    if (projects && projects.length > 0) {
      await EmployeesPerProjects.destroy({ where: { employeeid: id } });
      await EmployeesPerProjects.bulkCreate(
        projects.map((projectId: number) => ({
          projectid: projectId,
          employeeid: id,
        }))
      );
        
    }

    res.json({ message: 'Employee updated successfully!', employeeData: updatedEmployeeData});
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};






// DELETE
const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employeeData = await Employee.destroy({ where: { id } });
    res.json({ message: 'Employee deleted successfully!', employeeData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { 
  insert, 
  read, 
  readById, 
  update, 
  deleteEmployee
};
