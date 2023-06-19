import { Request, Response } from 'express';
import employee from '../model/employeeModel';


// CREATE
const insert = async (req: Request, res: Response) => {
  try {

    const { name, age, address } = req.body;
    const employeeData = await employee.create({ name, age, address});
    res.json({ message: 'Employee Created successfully!!', employeeData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


// READ
const read = async (req: Request, res: Response) => {
  try {
    const employeeData = await employee.findAll();
    res.json(employeeData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// READ BY ID
const readById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employeeData = await employee.findByPk(id);
    res.json(employeeData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// UPDATE
const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, age, address } = req.body;
    const [, employeeData] = await employee.update(
      { name, age, address },
      { where: { id }, returning: true }
    );
    res.json({ message: 'Employee updated successfully!!', employeeData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE
const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employeeData = await employee.destroy({ where: { id } });
    res.json({ message: 'Employee deleted successfully', employeeData });
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
