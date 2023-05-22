import DriverSchema from "../models/Driver.js";

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

export const create = async (req, res) => {
  try {
    const doc = new DriverSchema({
      driverNumber: req.body.driverNumber,
      company: req.body.company,
      driverName: req.body.driverName,
      truckNumber: req.body.truckNumber,
      trailerNumber: req.body.trailerNumber,
    });

    const drivers = await doc.save();

    res.json(drivers);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add new driver",
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
        truckNumber: req.body.truckNumber,
        trailerNumber: req.body.trailerNumber,
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
