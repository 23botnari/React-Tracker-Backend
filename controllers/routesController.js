import RoutesModel from "../models/Routes.js";

export const getAll = async (req, res) => {
  try {
    const routes = await RoutesModel.find().populate("");

    res.json(routes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get Routes.",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new RoutesModel({
      originRef: req.body.originRef,
      destinationRef: req.body.destinationRef,
      driverName: req.body.driverName,
      companyName: req.body.companyName,
      phoneNumber: req.body.phoneNumber,
      truckNumber: req.body.truckNumber,
    });

    const routes = await doc.save();

    res.json(routes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add new Route.",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const routesId = req.params.id;

    await RoutesModel.findOneAndDelete({
      _id: routesId,
    }).then(() => {
      res.json({
        message: "Route was deleted.",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to find a Route.",
    });
  }
};
export const update = async (req, res) => {
  try {
    const routesId = req.params.id;
    await RoutesModel.updateOne(
      {
        _id: routesId,
      },
      {
        originRef: req.body.originRef,
        destinationRef: req.body.destinationRef,
        driverName: req.body.driverName,
        companyName: req.body.companyName,
        phoneNumber: req.body.phoneNumber,
        truckNumber: req.body.truckNumber,
      },
      res.json({
        succes: true,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update Route.",
    });
  }
};
