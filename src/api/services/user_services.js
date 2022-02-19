// Importaing package
import * as userDbHelper from '../db_services/user_db_services.js';
import {
    validateRegistrationSchema,
    validateLoginSchema,
} from '../validation/validate_schema.js';
import { signAccessToken } from '../authentication/init_jwt.js';
import bcrypt from 'bcrypt';
import applogger from '../utils/logger.js';
import nodemailer from 'nodemailer';

// Register user
export const registerUser = async (body) => {
    try {
        console.log(body);
        applogger.info('treatmentService/registerUser- start');
        // const result = await validateRegistrationSchema.validateAsync(body);
        const result = body;
        const checkObj = {email:result.email, roll:result.roll};
        const doesExist = await userDbHelper.checkUser(checkObj);
        if (doesExist) throw new Error(409);
        const hashedPassword = await bcrypt.hash(result.password, 10);
        result.password = hashedPassword;
        const createUser = await userDbHelper.registerUser(result);
        const accessToken = await signAccessToken(createUser);
        applogger.info(`service result - ${JSON.stringify(accessToken)}`);
        const verificationUrl = `http://localhost:5000/api/users/verifyUser/${accessToken}`;
        const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: 'tonystank82129@gmail.com',
                      pass: 'Logan@13',
                    },
                  });
                  const mailOptions = {
                    from: 'tonystank82129@gmail.com',
                    to: result.email,
                    subject: 'Email Id Verification',
                    html: `<b style="color:black;">Click on the verify button to verify your account</b> <br/><a href=${verificationUrl} style="color:white;background-color: #4CAF50;border-radius:20px;padding:10px;border:none;box-shadow:0px 5px 10px black;outline:none;">Verify Account</a>`,
                  };
                  transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                      console.log(error);
                    } 
                    else {
                        console.log(info);
                    //   res.status(200).json({ result: 'Password reset successful' });
                    }
                  });
        // ////
        applogger.info('userService/registerUser- end');
        return { result: 'Check Mail' };
    } catch (error) {
        applogger.error(`treatmentService/registerUser - ${error.message}`);
        if (error.isJoi === true) throw new Error(400);
        throw error;
    }
};

// Login user
export const loginUser = async (body) => {
    try {
        applogger.info('treatmentService/loginUser- start');
        // const result = await validateLoginSchema.validateAsync(body);
        const result = body;
        const user = await userDbHelper.checkUser({email:result.email});
        if (!user) throw new Error(404);
        const isMatch = await bcrypt.compare(body.password, user.password);
        if (!isMatch) throw new Error(401);
        const accessToken = await signAccessToken(user);
        applogger.info(`service result - ${JSON.stringify(accessToken)}`);
        applogger.info('userService/loginUser- end');
        return accessToken;
    } catch (error) {
        applogger.error(`treatmentService/loginUser - ${error.message}`);
        if (error.isJoi === true) throw new Error(400);
        throw error;
    }
};

// Login user
export const verifyUser = async (body) => {
  try {
      applogger.info('treatmentService/loginUser- start');
      const checkObj = { roll:body.roll };
      const user = await userDbHelper.checkUser(checkObj);
      console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++")
      console.log(user)
      if (!user) throw new Error(404);
      // const isMatch = await bcrypt.compare(body.password, user.password);
      // if (!isMatch) throw new Error(401);
      const verificationResult = await userDbHelper.verifyOnUser(checkObj);
      applogger.info(`service result - ${JSON.stringify("")}`);
      applogger.info('userService/loginUser- end');
      return {mssg: "Verified"};
  } catch (error) {
      applogger.error(`treatmentService/loginUser - ${error.message}`);
      if (error.isJoi === true) throw new Error(400);
      throw error;
  }
};
