import { Request, Response } from 'express';
import EmployeesPerProjects from '../model/linkModel';

const insert = async (req: Request, res: Response) => {
  try {
    const {employeeid ,projectid} = req.body;
    const linkData = await EmployeesPerProjects.create({employeeid ,projectid});
    res.json({ message: 'EmployeesPerProjects Created successfully!!', linkData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { insert };
