import exppress from "express";

import mongoose from "mongoose";

import {
  registerValidation,
  loginValidation,
  companiesCreateValidation,
  driversCreateValidation,
} from "./validations.js";

import * as UserController from "./controllers/userController.js";
import * as CompaniesController from "./controllers/companiesController.js";
import * as driversController from "./controllers/driversController.js";
import * as RoutesController from "./controllers/routesController.js";

import handleValidationsErrors from "./utils/handleValidationsErrors.js";
import cors from "cors";
import * as dotenv from 'dotenv' 
dotenv.config()


mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => {
      console.log(`App is Listening on PORT ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
const corsOptions = {
  origin: "http://localhost:3000", // frontend URI (ReactJS)
};

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
app.get("/auth/role", UserController.protect, UserController.checkAuth);
app.get("/auth/me", UserController.protect, UserController.authme);

// Backend API route for fetching user by driver name
app.get("/users", UserController.getUser);

///---------------------------------
app.get("/routes", RoutesController.getAll);
app.get("/routes/:id", RoutesController.getRoutesByDriver);
app.post("/routes", RoutesController.create);
app.delete("/routes/:id", RoutesController.remove);
app.patch("/routes/:id", RoutesController.update);
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
