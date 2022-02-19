// Import pakages
import Treatment from '../models/Treatment.js';
import applogger from '../utils/logger.js';

// Add a treatment plan
export const addPlan = async (body) => {
    try {
        applogger.info('treatementDBServices/addPlan- start');
        let query = {
            description: body.description,
            name: body.name || body.t_name,
            status: body.status,
            code: (body.name || body.t_name)
                .toUpperCase()
                .replace(/\s+/g, '')
                .trim(),
            createdBy: body.userId,
            createdAt: Date.now(),
            version: body.version,
        };
        body.priority ? (query['priority'] = body.priority) : null;
        const newplan = new Treatment(query);
        const result = await newplan.save();
        applogger.info(`Db result - ${JSON.stringify(result)}`);
        applogger.info('treatementDBServices/addPlan- end');
        return result;
    } catch (error) {
        applogger.error(`treatementServices/addPlan- error: ${error.message}`);
        throw error;
    }
};

// Update a treatment plan
export const updatePlan = async (condition, body, userId) => {
    try {
        applogger.info('treatementDBServices/updatePlan- start');
        body.updatedBy = userId;
        body.updatedAt = Date.now();
        const result = await Treatment.findOneAndUpdate(condition, body, {
            new: true,
        });
        applogger.info(`Db result - ${JSON.stringify(result)}`);
        applogger.info('treatementDBServices/updatePlan- end');
        return result;
    } catch (error) {
        applogger.error(
            `treatementServices/updatePlan- error: ${error.message}`,
        );
        throw error;
    }
};

// Check plan
export const checkPlan = async (check) => {
    try {
        applogger.info('treatementDBServices/checkPlan- start');
        const doesExist = await Treatment.findOne(check);
        applogger.info(`Db result - ${JSON.stringify(doesExist)}`);
        applogger.info('treatementDBServices/checkPlan- end');
        return doesExist;
    } catch (error) {
        applogger.error(
            `treatementServices/checkPlan- error: ${error.message}`,
        );
        throw error;
    }
};

// Check plan
export const checkPriority = async (priority) => {
    try {
        applogger.info('treatementDBServices/checkPriority- start');
        const priorityConflict = await Treatment.findOne({
            priority: priority,
        });
        applogger.info(`Db result - ${JSON.stringify(priorityConflict)}`);
        applogger.info('treatementDBServices/checkPriority- end');
        return priorityConflict;
    } catch (error) {
        applogger.error(
            `treatementServices/checkPriority- error: ${error.message}`,
        );
        throw error;
    }
};

// Get Latest Version
export const getLatestVersion = async (name, condition) => {
    try {
        applogger.info('treatementDBServices/getLatestVersion- start');
        const result = await Treatment.find({ name: name, version: condition })
            .sort({ version: -1 })
            .limit(1);
        const latestVersion = result[0].version;
        applogger.info(`Db result - ${JSON.stringify(result)}`);
        applogger.info('treatementDBServices/getLatestVersion- end');
        return latestVersion;
    } catch (error) {
        applogger.error(
            `treatementServices/getLatestVersion- error: ${error.message}`,
        );
        throw error;
    }
};

// Delete Plan
export const deletePlan = async (condition, userId) => {
    try {
        applogger.info('treatementDBServices/deletePlan- start');
        const update = {
            isDeleted: true,
            deletedBy: userId,
            deletedAt: Date.now(),
        };
        const result = await Treatment.findOneAndUpdate(condition, update, {
            new: true,
        });
        applogger.info(`Db result - ${JSON.stringify(result)}`);
        applogger.info('treatementDBServices/deletePlan- end');
        return result;
    } catch (error) {
        applogger.error(
            `treatementServices/deletePlan- error: ${error.message}`,
        );
        throw error;
    }
};

// Get All Plan
export const getAllPlan = async () => {
    try {
        applogger.info('treatementDBServices/getAllPlan- start');
        const result = await Treatment.find({ isDeleted: false }, { _id: 0 });
        applogger.info(`Db result - ${JSON.stringify(result)}`);
        applogger.info('treatementDBServices/getFileteredPlan- end');
        return result;
    } catch (error) {
        applogger.error(
            `treatementServices/getFileteredPlan- error: ${error.message}`,
        );
        throw error;
    }
};

// Filtered Plan list
export const planList = async (search, sort, limit, skip) => {
    try {
        applogger.info('treatementDBServices/getFileteredPlan- start');
        const result = await Treatment.find(search, { _id: 0 })
            .sort(sort)
            .limit(limit)
            .skip(skip);
        applogger.info(`Db result - ${JSON.stringify(result)}`);
        applogger.info('treatementDBServices/getFileteredPlan- end');
        return result;
    } catch (error) {
        applogger.error(
            `treatementServices/getFileteredPlan- error: ${error.message}`,
        );
        throw error;
    }
};
