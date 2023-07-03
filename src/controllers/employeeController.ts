import { Request, Response } from 'express';
import Employee from '../model/employeeModel';
import Project from '../model/projectModel';
import EmployeesPerProjects from '../model/linkModel';
import {sequelize} from '../config/db'
import { Op } from 'sequelize';


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
    const employeeData = await sequelize.query(`SELECT * FROM getAllEmployeeDetails()`);

  const outputData ={
      Projects: employeeData[0].map((row: any) => ({
      ProjectId: row.projectid,
      ProjectCode: row.projectcode
    })),

  }  
    res.json(outputData);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};



// const read = async (req: Request, res: Response) => {
//   try {
//     const employeeData = await sequelize.query(`SELECT * FROM getAllEmployeeDetails()`);

//     const outputData = employeeData[0].reduce((result: any[], row: any) => {
//       const existingEmployee = result.find((employee) => employee.name === row.name && employee.address === row.address);
//       if (existingEmployee) {
//         existingEmployee.Projects.push({
//           ProjectId: row.projectid,
//           ProjectCode: row.projectcode
//         });
//       } else {
//         result.push({
//           name: row.name,
//           address: row.address,
//           Projects: [
//             {
//               ProjectId: row.projectid,
//               ProjectCode: row.projectcode
//             }
//           ]
//         });
//       }
//       return result;
//     }, []);

//     res.json(outputData);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };








// READ BY ID


const readById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const employeeData: any = await sequelize.query(
      `SELECT * FROM get_employee_detail($1)`,
      { bind: [id] }
    );
    const name = employeeData[0][0]?.name;
    const address = employeeData[0][0]?.address;

    const projects= [];
     const result: any[] = employeeData[0].map((row: any) => ({
      id: row.projectid,
      code: row.projectcode
    }));

    if(result[0].id===null){

      const outputData = {
        name: name,
        address: address,
        projects: projects
      };

   return res.json({ message: "Employee Details!", outputData });
    }

    const outputData = {
      name: name,
      address: address,
      projects: result
    };
 return res.json({ message: "Employee Details!", outputData });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE without db function
// const update = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const { name, age, address, projects } = req.body;

//     // Update the employee table
//     const updatedEmployeeData = await Employee.update(
//       { name, age, address },
//       { where: { id }, returning: true }
//     );
        
//         // Delete projects not present in the request body
//         await EmployeesPerProjects.destroy({
//           where: {
//             employeeid: id,
//             projectid: {
//               [Op.notIn]:projects.map((project:any) => project.projectid),
//             },
//           },
//         });

//     // Update employees_per_projects table
//     if (projects && projects.length > 0) {
//       for (const project of projects) {
//         const { projectid, position } = project;

//         try {
//           const existingProject = await EmployeesPerProjects.findOne({
//             where: {
//               projectid: projectid,
//               employeeid: id
//             }
//           });

//           if (!existingProject) {
//             await EmployeesPerProjects.create({
//               projectid: projectid,
//               employeeid: id,
//               position: position
//             });
//           } else {
//             await EmployeesPerProjects.update(
//               { position:position },
//               { where: { projectid: projectid, employeeid: id } }
//             );
//           }
//         } catch (error: any) {
//           console.log(error.message);
//         }
//       }
//     } 
//     res.json({ message: 'Employee updated successfully!', employeeData: updatedEmployeeData });
//   }catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };


//UPDATE with db function
const update = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, age, address, projects } = req.body;

    const updateQuery =`SELECT updateEmployees(${id},'${name}',${age},'${address}','${JSON.stringify(projects)}')`;

  await sequelize.query(updateQuery);
        
    res.json({ message: 'Employee updated successfully!'});
  }catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};


// UPDATE By ProjectID
// const updateByProjectId = async (req: Request, res: Response) => {
//   try {
//     const { id, projectId } = req.params;
//     const { name, age, address, projects } = req.body;

//     // Update the employee
//     const updatedEmployeeData= await Employee.update(
//       { name, age, address },
//       { where: { id }, returning: true }
//     );


//     if (projects && projects.length > 0) {
//       const projectsId = projects.map((projectId: number) => ({
//         projectid: projectId,
//         employeeid: id
//       }));

//       await EmployeesPerProjects.bulkCreate(projectsId);
//     }

//     res.json({ message: 'Employee updated successfully!', employeeData: updatedEmployeeData });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };








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
  deleteEmployee,
  // updateByProjectId
};
