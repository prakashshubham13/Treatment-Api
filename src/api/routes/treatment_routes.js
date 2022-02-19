// Importing packages
import Router from 'express';
import * as treatmentController from '../controller/treatment_controller.js';
import * as authToken from '../middlewares/auth_token.js';

const treatmentRouter = Router();

// Add a treatement Plan
treatmentRouter.post(
    '/addPlan',
    authToken.verifyAccessToken,
    treatmentController.addPlan,
);

// Add a treatement Plan
treatmentRouter.patch(
    '/updatePlan',
    authToken.verifyAccessToken,
    treatmentController.updatePlan,
);

// Delete a treatement Plan
treatmentRouter.delete(
    '/deletePlan',
    authToken.verifyAccessToken,
    treatmentController.deletePlan,
);

// Tratement lists according to filters
treatmentRouter.post(
    '/planList',
    authToken.verifyAccessToken,
    treatmentController.planList,
);

// Delete a treatement Plan
treatmentRouter.get(
    '/getPlan',
    authToken.verifyAccessToken,
    treatmentController.getAllPlan,
);

export default treatmentRouter;
