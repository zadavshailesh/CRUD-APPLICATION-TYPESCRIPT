import express, {Router} from 'express';
import {insert} from "../controllers/linkController";

const linkRouter:Router = express.Router();

linkRouter.post('/linktable/insert',insert);

export default linkRouter;
