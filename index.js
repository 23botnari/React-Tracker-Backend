import exppress from "express";

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  companiesCreateValidation,
} from "./validations.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/userController.js";
import * as CompaniesController from "./controllers/companiesController.js";
import handleValidationsErrors from "./utils/handleValidationsErrors.js";

mongoose
  .connect(
    "mongodb+srv://ibotnari2414:Botnari123@cluster0.i9qpoqf.mongodb.net/ReactTracker?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database is Connected."))
  .catch((error) => console.log("Database connection error.", error));

const app = exppress();

app.use(exppress.json());
app.post(
  "/auth/login",
  loginValidation,
  handleValidationsErrors,
  UserController.login
);
app.post(
  "/auth/register",
  registerValidation,
  handleValidationsErrors,
  UserController.register
);
app.get("/auth/me", checkAuth, UserController.authme);

app.get("/companies", checkAuth, CompaniesController.getAll);
app.post(
  "/companies",
  checkAuth,
  companiesCreateValidation,
  CompaniesController.create
);
app.delete("/companies/:id", checkAuth, CompaniesController.remove);
app.patch(
  "/companies/:id",
  checkAuth,
  companiesCreateValidation,
  handleValidationsErrors,
  CompaniesController.update
);

app.listen(4000, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server is Working.");
});
