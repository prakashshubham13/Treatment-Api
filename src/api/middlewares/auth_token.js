// Importaing package
import JWT from 'jsonwebtoken';
import createError from 'http-errors';
import applogger from '../utils/logger.js';

// Importing the app constants
import { SECRET } from '../../config/index.js';

// Verify Token
export const verifyAccessToken = (req, res, next) => {
    applogger.info('Verifying Token- start');
    if (!req.headers['authorization']) return next(createError.Unauthorized());
    const authHeader = req.headers['authorization'];
    const bearerToken = authHeader.split(' ');
    const token = bearerToken[1];
    JWT.verify(token, SECRET, (err, payload) => {
        if (err) {
            const message =
                err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            applogger.error(`Verify Token- error: ${err.message}`);
            return next(createError.Unauthorized(message));
        }
        applogger.info('Verifying Token- end');
        req.payload = payload;
        next();
    });
};

// Verify Token
export const verifyEmailAccessToken = (req, res, next) => {
    applogger.info('Verifying Token- start');
    const token = req.params.code;
    JWT.verify(token, SECRET, (err, payload) => {
        if (err) {
            const message =
                err.name === 'JsonWebTokenError' ? 'Unauthorized' : err.message;
            applogger.error(`Verify Token- error: ${err.message}`);
            return next(createError.Unauthorized(message));
        }
        applogger.info('Verifying Token- end');
        req.payload = payload;
        next();
    });
};
