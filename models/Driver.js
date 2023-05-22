import mongoose from "mongoose";
const DriverSchema = new mongoose.Schema(
  {
    driverNumber: {
      type: String,
      required: true,
    },
    company: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    truckNumber: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model("Drivers", DriverSchema);
