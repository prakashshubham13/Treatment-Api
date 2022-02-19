// Import pakages
import User from '../models/User.js';
import applogger from '../utils/logger.js';

// Register user
export const registerUser = async (body) => {
    try {
        applogger.info('treatementDBServices/registerUser- start');
        const user = new User({
            name: body.name,
            email: body.email,
            password: body.password,
            roll: body.roll,
            isDeleted: false,
            admin: body.admin,
            isActive: false
        });
        const newUser = new User(user);
        const createUser = await newUser.save();
        applogger.info(`Db result - ${JSON.stringify(createUser)}`);
        applogger.info('treatementDBServices/registerUser- end');
        return createUser;
    } catch (error) {
        applogger.error(
            `treatementServices/registerUser- error: ${error.message}`,
        );
        throw error;
    }
};

// Check for a user
export const checkUser = async (data) => {
    try {
        applogger.info('treatementDBServices/checkUser- start');
        const doesExist = await User.findOne({$and:[data]});
        applogger.info(`Db result - ${JSON.stringify(doesExist)}`);
        applogger.info('treatementDBServices/checkUser- end');
        return doesExist;
    } catch (error) {
        applogger.error(
            `treatementServices/checkUser- error: ${error.message}`,
        );
        throw error;
    }
};

// Verification On User
export const verifyOnUser = async (data) => {
    try{
        const result = await User.findOneAndUpdate(data,{$set:{isActive:true}},{new:true});
        return result;
    }
    catch (error){
        applogger.error(
            `treatementServices/checkUser- error: ${error.message}`,
        );
        throw error;
    }
}
