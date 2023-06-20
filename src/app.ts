import express, { Express } from 'express';
import { config } from 'dotenv'
import employeeRoutes from  '../src/routes/employeeRoute';
import userRouter from '../src/routes/userRoute'

config();

const app: Express= express();

app.use(express.json());

// For routes
app.use('/', employeeRoutes);
app.use('/',userRouter);

const port: Number= Number(process.env.PORT) || 9000;
app.listen(port,()=>{
  console.log(`Server is running at https://localhost ${port}`);
})

