import mongoose, { Schema } from "mongoose";

const addressSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  name: { type: String, required: true },
  phone_num: { type: String, required: true },
  address: { type: String, required: true },
});

const Address = mongoose.model("Address", addressSchema);
export default Address;
