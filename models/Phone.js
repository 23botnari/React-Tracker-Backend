import mongoose from "mongoose";
const PhoneSchema = new mongoose.Schema(
  {
    phoneNumber: {
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
export default mongoose.model("Phones", PhoneSchema);
