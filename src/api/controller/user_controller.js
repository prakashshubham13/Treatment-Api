// Importing packages
import * as useServices from '../services/user_services.js';
import * as response from '../../config/response.js';
import applogger from '../utils/logger.js';

/**
 * controller to register user
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response with http status code and result
 */
export const registerUser = async (req, res) => {
    try {
        applogger.info('userController/registerUser- start');
        applogger.info(`HTTP req body - ${JSON.stringify(req.body)}`);
        const result = await useServices.registerUser(req.body);
        applogger.info(`HTTP res body - ${JSON.stringify(result)}`);
        applogger.info('userController/registerUser- end');
        return response.done(req, res, 201, result);
    } catch (error) {
        applogger.error(`userController/registerUser- error: ${error.message}`);
        return response.notDone(res, error.message);
    }
};

/**
 * controller to verify user
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response with http status code and result
 */
 export const verifyUser = async (req, res) => {
    try {
        console.log("--------------------------------------------------------------");
        console.log(req.payload)
        applogger.info('userController/verifyUser- start');
        applogger.info(`HTTP req body - ${JSON.stringify(req.payload)}`);
        const result = await useServices.verifyUser(req.payload);
        applogger.info(`HTTP res body - ${JSON.stringify(result)}`);
        applogger.info('userController/verifyUser- end');
        return response.done(req, res, 200, result);
    } catch (error) {
        applogger.error(`userController/verifyUser- error: ${error.message}`);
        return response.notDone(res, error.message);
    }
};

/**
 * controller to login user
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response with http status code and result
 */
export const loginUser = async (req, res) => {
    try {
        applogger.info('userController/loginUser- start');
        applogger.info(`HTTP req body - ${JSON.stringify(req.body)}`);
        const result = await useServices.loginUser(req.body);
        applogger.info(`HTTP res body - ${JSON.stringify(result)}`);
        applogger.info('userController/loginUser- end');
        return response.done(req, res, 200, result);
    } catch (error) {
        applogger.error(`userController/loginUser- error: ${error.message}`);
        return response.notDone(res, error.message);
    }
};
