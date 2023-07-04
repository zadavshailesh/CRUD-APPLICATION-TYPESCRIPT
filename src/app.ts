import express, { Express } from 'express';
import { config } from 'dotenv'
import employeeRoutes from  '../src/routes/employeeRoute';
import userRouter from '../src/routes/userRoute';
import projectRouter from './routes/projectRoute';
import linkRouter from './routes/linkRoute';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express'
import swaggerJsDoc from 'swagger-jsdoc';

config();

const app: Express= express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());

// Swagger configuration options

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD APPLICATION',
      description: 'This is a CRUD Application Project where employee can be inserted, updated, and deleted',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:9000',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
  components: {
    schemas: {
      EmployeesDetails: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'A message indicating the purpose of the response',
          },
          outputData: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'The name of the employee',
              },
              address: {
                type: 'string',
                description: 'The address of the employee',
              },
              projects: {
                type: 'array',
                description: 'An array of projects associated with the employee',
                items: {
                  type: 'object',
                  properties: {
                    id: {
                      type: 'integer',
                      description: 'The ID of the project',
                    },
                    code: {
                      type: 'string',
                      description: 'The code of the project',
                    },
                  },
                },
              },
            },
          },
        },
      },
      EmployeeUpdateResponse: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: 'A message indicating the success of the update operation',
          },
        },
      },
    },
  },
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// For routes
app.use('/', employeeRoutes);
app.use('/',userRouter);
app.use('/',projectRouter);
app.use('/',linkRouter);

const port: Number= Number(process.env.PORT) || 9000;
app.listen(port,()=>{
  console.log(`Server is running at https://localhost ${port}`);
})


