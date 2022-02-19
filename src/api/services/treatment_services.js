// Importaing package
import * as treatmentDbHelper from '../db_services/treatment_db_services.js';
import {
    validateInputPlanSchema,
    validateFilterPlanSchema,
    validateDeletePlanSchema,
    validateEditPlanSchema,
} from '../validation/validate_treatement.js';
import applogger from '../utils/logger.js';

// Add plan
export const addPlan = async (body, userId) => {
    try {
        applogger.info('treatmentService/addPlan- start');
        body = await validateInputPlanSchema.validateAsync(body);
        body.userId = userId;
        let priorityConflict;
        const check = {
            name: body.name,
        };
        const doesExist = await treatmentDbHelper.checkPlan(check);
        if (body.priority)
            priorityConflict = await treatmentDbHelper.checkPriority(
                body.priority,
            );
        if (doesExist || priorityConflict) throw new Error(409);
        else {
            if (body.status === 'DRAFT') {
                body.version = 0.001;
                const createPlan = await treatmentDbHelper.addPlan(body);
                applogger.info(
                    `treatmentService/addPlan - new plan created ${JSON.stringify(
                        createPlan,
                    )}`,
                );
                applogger.info('treatmentService/addPlan - end');
                return createPlan;
            } else {
                body.version = 1.0;
                const createPlan = await treatmentDbHelper.addPlan(body);
                applogger.info(
                    `treatmentService/addPlan - new plan created ${JSON.stringify(
                        createPlan,
                    )}`,
                );
                applogger.info('treatmentService/addPlan - end');
                return createPlan;
            }
        }
    } catch (error) {
        applogger.error(`treatmentService/addPlan - ${error.message}`);
        if (error.isJoi === true) throw new Error(400);
        throw error;
    }
};

// Update plan
export const updatePlan = async (body, userId) => {
    try {
        applogger.info('treatmentService/updatePlan- start');
        body = await validateEditPlanSchema.validateAsync(body);
        body.userId = userId;
        let priorityConflict;
        const check = {
            name: body.t_name,
            version: body.t_version,
            isDeleted: false,
        };
        const doesExist = await treatmentDbHelper.checkPlan(check);
        if (body.priority)
            priorityConflict = await treatmentDbHelper.checkPriority(
                body.priority,
            );
        if (doesExist && !priorityConflict) {
            if (doesExist.status === 'DRAFT' && body.status === 'DRAFT') {
                const condition = {
                    code: body.t_name.toUpperCase().replace(/\s+/g, '').trim(),
                    version: body.t_version,
                };
                body.version = body.t_version;
                const createPlan = await treatmentDbHelper.updatePlan(
                    condition,
                    body,
                    userId,
                );
                applogger.info(
                    `service result - ${JSON.stringify(createPlan)}`,
                );
                applogger.info('treatementService/updatePlan- end');
                return createPlan;
            }
            if (doesExist.status === 'PUBLISHED' && body.status === 'DRAFT') {
                const condition = {
                    $gte: body.t_version,
                    $lt: body.t_version + 1,
                };
                body.version = await treatmentDbHelper.getLatestVersion(
                    body.t_name,
                    condition,
                );
                body.userId = userId;
                body.version = (body.version + 0.001).toFixed(3);
                body.description = body.description
                    ? body.description
                    : doesExist.description;
                //Condition if we want to copy the priorty to the updated plan 
                // body.priority = body.priority
                //     ? body.priority
                //     : doesExist.priority;
                const createPlan = await treatmentDbHelper.addPlan(body);
                applogger.info(
                    `service result - ${JSON.stringify(createPlan)}`,
                );
                applogger.info('treatementService/updatePlan- end');
                return createPlan;
            }
            if (
                (doesExist.status === 'DRAFT' && body.status === 'PUBLISHED') ||
                (doesExist.status === 'PUBLISHED' &&
                    body.status === 'PUBLISHED')
            ) {
                const condition = {
                    $gte: body.t_version,
                };
                body.version = await treatmentDbHelper.getLatestVersion(
                    body.t_name,
                    condition,
                );
                body.description = body.description
                    ? body.description
                    : doesExist.description;
                //Condition if we want to copy the priorty to the updated plan     
                // body.priority = body.priority
                //     ? body.priority
                //     : doesExist.priority;
                body.version = (Math.floor(body.version) + 1.0).toFixed(3);
                const createPlan = await treatmentDbHelper.addPlan(body);
                applogger.info(
                    `service result - ${JSON.stringify(createPlan)}`,
                );
                applogger.info('treatementService/updatePlan- end');
                return createPlan;
            }
        } else {
            if (!doesExist) throw new Error(404);
            if (priorityConflict) throw new Error(409);
        }
    } catch (error) {
        applogger.error(`treatmentService/updatePlan - ${error.message}`);
        if (error.isJoi === true) throw new Error(400);
        throw error;
    }
};

// Delete plan
export const deletePlan = async (body, userId) => {
    try {
        applogger.info('treatmentService/deletePlan- start');
        const check = {
            name: body.name,
            version: body.version,
            isDeleted: false,
        };
        const doesExist = await treatmentDbHelper.checkPlan(check);
        if (!doesExist) throw new Error(404);
        body = await validateDeletePlanSchema.validateAsync(body);
        const condition = {
            code: body.name.toUpperCase().replace(/\s+/g, '').trim(),
            version: body.version,
        };
        const plan = await treatmentDbHelper.deletePlan(condition, userId);
        applogger.info(`service result - ${JSON.stringify(plan)}`);
        applogger.info('treatementService/deletePlan- end');
        return plan;
    } catch (error) {
        applogger.error(`treatmentService/deletePlan - ${error.message}`);
        if (error.isJoi === true) throw new Error(400);
        throw error;
    }
};

// Get all plans
export const getAllPlan = async () => {
    try {
        applogger.info('treatmentService/getAllPlan- start');
        const result = await treatmentDbHelper.getAllPlan();
        if (!result) throw new Error(204);
        applogger.info(`service result - ${JSON.stringify(result)}`);
        applogger.info('treatementService/getAllPlan- end');
        return result;
    } catch (error) {
        applogger.error(`treatmentService/getAllPlan - ${error.message}`);
        throw error;
    }
};

// Get filter plans
export const planList = async (body) => {
    try {
        applogger.info('treatmentService/planList- start');
        body = await validateFilterPlanSchema.validateAsync(body);
        let { page, size, sort, filter } = body;
        page = !page ? 1 : page;
        size = !size ? 5 : size;
        let query = {};
        filter.forEach((key) => {
            query[key.id] = key.value;
        });
        query = { ...query, isDeleted: false };
        const limit = parseInt(size);
        const skip = (page - 1) * size;
        let sortby = {};
        sortby[sort.id] = sort.value;
        const result = await treatmentDbHelper.planList(
            query,
            sortby,
            limit,
            skip,
        );
        if (!result) throw new Error(204);
        applogger.info(`service result - ${JSON.stringify(result)}`);
        applogger.info('treatementService/planList- end');
        return result;
    } catch (error) {
        applogger.error(`treatmentService/planList - ${error.message}`);
        if (error.isJoi === true) throw new Error(400);
        throw error;
    }
};
