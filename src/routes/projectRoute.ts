import express,{Router} from 'express';
import {insert} from "../controllers/projectController"


const projectRouter:Router = express.Router();


projectRouter.post('/projects/insert',insert);

export default projectRouter;