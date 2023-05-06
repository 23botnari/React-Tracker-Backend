import mongoose from "mongoose";
const RoutesSchema = new mongoose.Schema(
  {
    originRef: {
      type: String, 
      required: true,
    },
    destinationRef: {
        type:String,
        required:true,
    },
  },
  {
    timestamps: true,
  }
);
export default mongoose.model('Routes',RoutesSchema);