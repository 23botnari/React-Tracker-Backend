import mongoose from "mongoose";
const RoutesSchema = new mongoose.Schema(
  {
    originRef: {
      type: String,
      required: true,
    },
    destinationRef: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    companyName: {
      type: String,
      required: true,
    },
    phoneNumber: {
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
export default mongoose.model("Routes", RoutesSchema);
