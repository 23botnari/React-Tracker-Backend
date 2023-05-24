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
export const getRoutesByDriver1 = async (req, res) => {
  const { driverId } = req.params;
  try {
    const routes = await RoutesModel.findById(driverId);
    console.log(driverId)

    res.json(routes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get routes.",
    });
  }
};

export const getRoutesByDriver = async (req, res) => {
 
  try {
      const { id } = req.params;
      const routes = await RoutesModel.find({driverId:id});
    
    if (!routes.length ) {
      return res.status(404).json({ message: 'Routes not found' });
    }

    res.json(routes);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get routes.",
    });
  }
};



export const create = async (req, res) => {
  try {
    const doc = new RoutesModel({
      originRef: req.body.originRef,
      destinationRef: req.body.destinationRef,
      driverId:req.body.driverId,
      driverName: req.body.driverName,
      driverSurname: req.body.driverSurname,
      companyName: req.body.companyName,
      driverNumber: req.body.driverNumber,
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

        driverId:req.body.driverId,
        driverName: req.body.driverName,
        driverSurname: req.body.driverSurname,
        companyName: req.body.companyName,
        driverNumber: req.body.driverNumber,
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
