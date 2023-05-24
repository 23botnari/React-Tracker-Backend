import exppress from "express";

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  companiesCreateValidation,
  driversCreateValidation,
} from "./validations.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/userController.js";
import * as CompaniesController from "./controllers/companiesController.js";
import * as driversController from "./controllers/driversController.js";
import * as RoutesController from "./controllers/routesController.js";

import handleValidationsErrors from "./utils/handleValidationsErrors.js";
import cors from "cors";

mongoose
  .connect(
    "mongodb+srv://ibotnari2414:Botnari123@cluster0.i9qpoqf.mongodb.net/ReactTracker?retryWrites=true&w=majority"
  )
  .then(() => console.log("Database is Connected."))
  .catch((error) => console.log("Database connection error.", error));

const app = exppress();
app.use(cors());

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
app.get("/auth/role",UserController.protect,UserController.checkAuth)
app.get("/auth/me", UserController.protect, UserController.authme);

// Backend API route for fetching user by driver name
app.get("/users",UserController.getUser);

///---------------------------------
app.get("/routes", RoutesController.getAll);
app.get("/routes/:id",RoutesController.getRoutesByDriver)
app.post("/routes", RoutesController.create);
app.delete("/routes/:id", RoutesController.remove);
app.patch(
  "/routes/:id",
  RoutesController.update
);
///---------------------------------

app.get("/companies", CompaniesController.getAll);

app.post("/companies", companiesCreateValidation, CompaniesController.create);
app.delete("/companies/:id", CompaniesController.remove);
app.patch(
  "/companies/:id",
  companiesCreateValidation,
  handleValidationsErrors,
  CompaniesController.update
);
///---------------------------------
app.get("/drivers", driversController.getAll);
app.get("/drivers/:id", driversController.getById);

app.post("/drivers", driversCreateValidation, driversController.create);
app.delete("/drivers/:id", driversController.remove);
app.patch(
  "/drivers/:id",
  driversCreateValidation,
  handleValidationsErrors,
  driversController.update
);
///---------------------------------

app.listen(4000, (error) => {
  if (error) {
    return console.log(error);
  }
  console.log("Server is Working.");
});
