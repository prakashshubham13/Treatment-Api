// Importing package
import Joi from '@hapi/joi';

// Validating Input Plan Schema
export const validateInputPlanSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.any().valid("DRAFT", "PUBLISHED").required(),
    priority:Joi.number()
});

// Validating Edit Plan Schema
export const validateEditPlanSchema = Joi.object({
    name: Joi.string(),
    t_name: Joi.string().required(),
    t_version: Joi.number().required(),
    description: Joi.string(),
    status: Joi.any().valid("DRAFT", "PUBLISHED").required(),
    priority:Joi.number()
});

// Validating FilterPlan Schema
export const validateFilterPlanSchema = Joi.object({
    sort: Joi.object().required(),
    filter: Joi.array().items(Joi.object()).required(),
    page: Joi.number().required().greater(0),
    size:Joi.number().required().greater(0)
});

// Validating Delete Plan Schema
export const validateDeletePlanSchema = Joi.object({
    name: Joi.string().required(),
    version: Joi.number().required(),
});