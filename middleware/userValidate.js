import { check } from "express-validator";

export const userValidator = [
    check('name').notEmpty().withMessage('name cannot be empty'),
    check('role').notEmpty().withMessage('role cannot be empty')
]