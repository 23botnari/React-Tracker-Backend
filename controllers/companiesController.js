import CompaniesModel from "../models/Companies.js";

export const getAll = async (req, res) => {
  try {
    const companies = await CompaniesModel.find().populate("");

    res.json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to get companies.",
    });
  }
};

export const create = async (req, res) => {
  try {
    const doc = new CompaniesModel({
      companyName: req.body.companyName,
      isActive: req.body.isActive,
    });

    const companies = await doc.save();

    res.json(companies);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to add new Company.",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const companiesId = req.params.id;

    await CompaniesModel.findOneAndDelete({
      _id: companiesId,
    }).then(() => {
      res.json({
        message: "Company was deleted.",
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to find a company.",
    });
  }
};
export const update = async (req, res) => {
  try {
    const companiesId = req.params.id;
    await CompaniesModel.updateOne(
      {
        _id: companiesId,
      },
      {
        companyName: req.body.companyName,
        isActive: req.body.isActive,
      },
      res.json({
        succes: true,
      })
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to update company.",
    });
  }
};
