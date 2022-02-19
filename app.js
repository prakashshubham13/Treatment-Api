// Importaing package
import express from 'express';
import cors from 'cors';
import createError from 'http-errors';
import consola from 'consola';
import swaggerUI from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';
import userRouter from './src/api/routes/user_routes.js';
import treatmentRouter from './src/api/routes/treatment_routes.js';
import { connectDB } from './src/api/connection/init_db.js';
import applogger from './src/api/utils/logger.js';
import { options } from './src/api/helper/swagger.js';

// Importing the app constants
import { PORT } from './src/config/index.js';

// Initialize the application
const app = express();

//Swagger
const swaggerSpecs = swaggerJsDoc(options);
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

// Middlewares to handle cors error and parse request body
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// User Router Middleware
app.use('/api/users', userRouter);
app.use('/api/treatement', treatmentRouter);

// Error handling if route does not exist
app.use((req, res, next) => {
    next(createError.NotFound('This route does not exist'));
});

// Error handler middleware
app.use((error, req, res, next) => {
    res.status(error.status || 500).send({
        error: {
            status: error.status || 500,
            message: error.message || 'Internal Server Error',
        },
    });
});

// Connecting to Database
connectDB();

// Start Listenting for the server on PORT
app.listen(PORT, () => {
    applogger.info(`Server started on PORT ${PORT}`),
        consola.success({
            message: `Server started on PORT ${PORT}`,
            badge: true,
        });
});
