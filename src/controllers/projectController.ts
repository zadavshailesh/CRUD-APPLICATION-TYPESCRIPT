import { Request, Response } from 'express';
import Project from '../model/projectModel';

const insert = async (req: Request, res: Response) => {
  try {
    const { projectid, code, name, description } = req.body;
    const projectData = await Project.create({ projectid, code, name, description });
    res.json({ message: 'Project Created successfully!!', projectData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export { insert };
