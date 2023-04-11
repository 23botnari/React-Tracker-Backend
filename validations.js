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
  body("name", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
  body("isActive", "Something Wrong happened.").isBoolean(),
];

export const phonesCreateValidation = [
  body("phonenNumber", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
  body("company", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
  body("driverName", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
  body("truckNumber", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
  body("trailerNumber", "Minimum 3 symbols.").isLength({ min: 3 }).isString(),
];
