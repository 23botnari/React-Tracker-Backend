import {body} from 'express-validator'

export const loginValidation =[
    body('email','Email format is incorect').isEmail(),
    body('password','Needed minimum 5 symbols').isLength({min:5}),
]
export const registerValidation =[
    body('email','Email format is incorect').isEmail(),
    body('password','Needed minimum 5 symbols').isLength({min:5}),
]
export const companiesCreateValidation =[
    body('name','Minimum 3 symbols.').isLength({min:3}).isString(),
    body('isActive','Something Wrong happened.').isBoolean(),
]