// Importing package
import Joi from '@hapi/joi';

// Validating Registration Schema
export const validateRegistrationSchema = Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .required()
        .regex(
            new RegExp(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            ),
        ),
});

// Validating Login Schema
export const validateLoginSchema = Joi.object({
    email: Joi.string()
        .required()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    password: Joi.string()
        .required()
        .regex(
            new RegExp(
                /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
            ),
        ),
});