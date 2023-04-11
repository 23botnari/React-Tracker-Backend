import PhoneModel from "../models/Phone.js";

export const getAll = async (req, res) => {
  try {
    const phones = await PhoneModel.find().populate("");

    res.json(phones);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get phones.",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new PhoneModel({
      phoneNumber: req.body.phoneNumber,
      company: req.body.company,
      driverName: req.body.driverName,
      truckNumber: req.body.truckNumber,
      trailerNumber: req.body.trailerNumber,
    });

    const phones = await doc.save();

    res.json(phones);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add new phone.",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const phonesId = req.params.id;

    await PhoneModel.findOneAndDelete({
      _id: phonesId,
    }).then(() => {
      res.json({
        message: "Phone was deleted.",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to find a Phone.",
    });
  }
};
export const update = async (req, res) => {
  try {
    const phonesId = req.params.id;
    await PhoneModel.updateOne(
      {
        _id: phonesId,
      },
      {
        phoneNumber: req.body.phoneNumber,
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
      message: "Failed to update Phone.",
    });
  }
};
