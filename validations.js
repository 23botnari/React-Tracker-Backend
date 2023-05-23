import { body } from "express-validator";

export const loginValidation = [
  body("email", "Email format is incorect").isEmail(),
  body("password", "Needed minimum 5 symbols").isLength({ min: 5 }),
];

export const registerValidation = [
  body("email", "Email format is incorect").isEmail(),
  body("password", "Needed minimum 5 symbols").isLength({ min: 5 }),
];

export const companiesCreateValidation = [
  body("companyName", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
  body("isActive", "Something Wrong happened.").isBoolean(),
];

export const driversCreateValidation = [
  body("phoneNumber", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
  body("company", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
  body("driverName", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
  body("driverSurname", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
  body("truckNumber", "Minimum 1 symbols.").isLength({ min: 1 }).isString(),
  
];
