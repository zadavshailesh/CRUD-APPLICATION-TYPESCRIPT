import express, { Express } from 'express';
import { config } from 'dotenv'
import employeeRoutes from  '../src/routes/employeeRoute';
import userRouter from '../src/routes/userRoute';
import bodyParser from 'body-parser';

config();

const app: Express= express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

// For routes
app.use('/', employeeRoutes);
app.use('/',userRouter);

const port: Number= Number(process.env.PORT) || 9000;
app.listen(port,()=>{
  console.log(`Server is running at https://localhost ${port}`);
})

