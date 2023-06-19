import express, { Express } from 'express';
import { config } from 'dotenv'
import employeeRoutes from  '../src/routes/employeeRoute';

config();

const app: Express= express();

app.use(express.json());

// For routes
app.use('/', employeeRoutes);

const port: Number= Number(process.env.PORT) || 9000;
app.listen(port,()=>{
  console.log(`Server is running at https://localhost ${port}`);
})

