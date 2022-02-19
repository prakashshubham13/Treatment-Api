// Importing packages
import Router from 'express';
import * as userController from '../controller/user_controller.js';
import * as authToken from '../middlewares/auth_token.js';

const userRouter = Router();

// User Registration Route
userRouter.post('/registerUser', userController.registerUser);

// User Verification Route
userRouter.get('/verifyUser/:code', authToken.verifyEmailAccessToken, userController.verifyUser);

// User Login Route
userRouter.post('/loginUser', userController.loginUser);

export default userRouter;
