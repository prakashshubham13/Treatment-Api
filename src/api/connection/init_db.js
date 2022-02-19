// Importing packages
import mongoose from 'mongoose';
import consola from 'consola';
const { success, error } = consola;
import applogger from '../utils/logger.js';

//Requiring the app constants
import { DB } from '../../config/index.js';
const startApp = async () => {
    try {
        // Connection With DB
        await mongoose.connect(DB, {
            useFindAndModify: true,
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        success({
            message: `Successfully connected with the Database \n${DB}`,
            badge: true,
        });
    } catch (err) {
        error({
            message: `Unable to connect with Database \n${err}`,
            badge: true,
        });
    }
};
export const connectDB = () => {
    startApp();
    mongoose.connection.on('connected', () =>
        applogger.info('Database Connected'),
    );
    mongoose.connection.on('error', () => console.log('Database error'));
    mongoose.connection.on('disconnected', () =>
        applogger.info('Database Disconnected'),
    );
    process.on('SIGINT', () => {
        mongoose.connection.close(() => {
            applogger.info(
                'Mongoose connection is disconnected due to app termination.....',
            );
        });
        process.exit(0);
    });
};
