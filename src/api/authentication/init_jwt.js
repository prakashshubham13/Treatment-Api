// Importaing package
import JWT from 'jsonwebtoken';
import createError from 'http-errors';
import applogger from '../utils/logger.js';

// Importing the app constants
import { SECRET } from '../../config/index.js';

export const signAccessToken = (user) => {
    applogger.info('Generate Token- start');
    return new Promise((resolve, reject) => {
        const payload = { roll: user.roll, password: user.password };
        const secret = SECRET;
        const options = {
            expiresIn: '1h',
        };
        JWT.sign(payload, secret, options, (err, token) => {
            if (err) {
                applogger.error(`Generate Token- error: ${err.message}`);
                reject(createError.InternalServerError());
                return;
            }
            applogger.info('Generate Token- end');                                                                                                                                                                                                                              
            resolve(token);
        });
    });
};
