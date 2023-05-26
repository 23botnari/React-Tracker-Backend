import DriverSchema from "../models/Driver.js";
import UserModel from "../models/User.js";
import bcrypt from "bcrypt";

export const getAll = async (req, res) => {
  try {
    const drivers = await DriverSchema.find().populate("");

    res.json(drivers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get drivers.",
    });
  }
};

export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const driver = await DriverSchema.findById(id);
    
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    res.json(driver);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get driver.",
    });
  }
};


export const create = async (req, res) => {
  try {
    const driverData = {
      driverNumber: req.body.driverNumber,
      company: req.body.company,
      driverName: req.body.driverName,
      driverSurname: req.body.driverSurname,
      truckNumber: req.body.truckNumber,
    };
    const newDriver = await DriverSchema.create(driverData);

    const user = {
      name: newDriver.driverName + " " + newDriver.driverSurname,
      email: `${newDriver.driverName + newDriver.driverSurname}@tracker.com`,
      password: "12345", //
      role: "driver",
    };

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.passwordHash = hashedPassword;
    delete user.password;

    const newUser = await UserModel.create(user);

    res.json({ driver: newDriver, user: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add new driver and user",
    });
  }
};

export const remove = async (req, res) => {
  try {
    const driversId = req.params.id;

    await DriverSchema.findOneAndDelete({
      _id: driversId,
    }).then(() => {
      res.json({
        message: "Driver was deleted.",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to find a driver.",
    });
  }
};

export const update = async (req, res) => {
  try {
    const driversId = req.params.id;
    await DriverSchema.updateOne(
      {
        _id: driversId,
      },
      {
        driverNumber: req.body.driverNumber,
        company: req.body.company,
        driverName: req.body.driverName,
        driverSurname:req.body.driverSurname,
        truckNumber: req.body.truckNumber,
      },
      res.json({
        succes: true,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update driver.",
    });
  }
};
