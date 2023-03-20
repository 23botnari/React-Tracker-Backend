import mongoose from "mongoose";
const CompaniesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    isActive: {
      type: Boolean,
      required: true,
      default:false,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Companies',CompaniesSchema);