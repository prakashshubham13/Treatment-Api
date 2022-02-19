// Importing packages
import * as treatmentServices from '../services/treatment_services.js';
import * as response from '../../config/response.js';
import applogger from '../utils/logger.js';

/**
 * controller to add a treatment plan
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response with http status code and result
 */
export const addPlan = async (req, res) => {
    try {
        applogger.info('treatementController/addPlan- start');
        applogger.info(`HTTP req body - ${JSON.stringify(req.body)}`);
        const result = await treatmentServices.addPlan(
            req.body,
            req.payload.id,
        );
        applogger.info(`HTTP res body - ${JSON.stringify(result)}`);
        applogger.info('treatementController/addPlan- end');
        return response.done(req, res, 201, result);
    } catch (error) {
        applogger.error(
            `treatementController/addPlan- error: ${error.message}`,
        );
        return response.notDone(res, error.message);
    }
};

/**
 * controller to update a treatment plan
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response with http status code and result
 */
export const updatePlan = async (req, res) => {
    try {
        applogger.info('treatementController/updatePlan- start');
        applogger.info(
            `HTTP req body - ${JSON.stringify(
                req.body,
            )} - query params: ${JSON.stringify(req.query)}`,
        );
        req.body.t_name = req.query.name;
        req.body.t_version = req.query.version;
        const result = await treatmentServices.updatePlan(
            req.body,
            req.payload.id,
        );
        applogger.info(`HTTP res body - ${JSON.stringify(result)}`);
        applogger.info('treatementController/updatePlan- end');
        return response.done(req, res, 200, result);
    } catch (error) {
        applogger.error(
            `treatementController/updatePlan- error: ${error.message}`,
        );
        return response.notDone(res, error.message);
    }
};

/**
 * controller to delete a treatment plan
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response with http status code and result
 */
export const deletePlan = async (req, res) => {
    try {
        applogger.info('treatementController/deletePlan- start');
        applogger.info(`HTTP req body - ${JSON.stringify(req.body)}`);
        const result = await treatmentServices.deletePlan(
            req.body,
            req.payload.id,
        );
        applogger.info(`HTTP res body - ${JSON.stringify(result)}`);
        applogger.info('treatementController/deletePlan- end');
        return response.done(req, res, 200, result);
    } catch (error) {
        applogger.error(
            `treatementController/deletePlan- error: ${error.message}`,
        );
        return response.notDone(res, error.message);
    }
};

/**
 * controller to get all treatment plan
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response with http status code and result
 */
export const getAllPlan = async (req, res) => {
    try {
        applogger.info('treatementController/getAllPlan- start');
        applogger.info(`HTTP req body - ${JSON.stringify(req.body)}`);
        const body = req.query;
        const result = await treatmentServices.getAllPlan(body);
        applogger.info(`HTTP res body - ${JSON.stringify(result)}`);
        applogger.info('treatementController/getAllPlan- end');
        return response.done(req, res, 200, result);
    } catch (error) {
        applogger.error(
            `treatementController/getAllPlan- error: ${error.message}`,
        );
        return response.notDone(res, error.message);
    }
};

/**
 * controller get filtered treatment plan
 * @param {Request} req
 * @param {Response} res
 * @returns {Response} response with http status code and result
 */
export const planList = async (req, res) => {
    try {
        applogger.info('treatementController/planList- start');
        applogger.info(`HTTP req body - ${JSON.stringify(req.body)}`);
        const result = await treatmentServices.planList(req.body);
        applogger.info(`HTTP res body - ${JSON.stringify(result)}`);
        applogger.info('treatementController/planList- end');
        return response.done(req, res, 200, result);
    } catch (error) {
        applogger.error(
            `treatementController/planList- error: ${error.message}`,
        );
        return response.notDone(res, error.message);
    }
};
