import mongoose, { Schema } from "mongoose";

//Define the Attribute schema
export const attributeSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  attribute: [
    {
      key: { type: String, required: true },
      value: { type: String, required: true },
    },
  ],
});

// Create the model based on the schema
const Attribute = mongoose.model("Attribute", attributeSchema);

export default Attribute;
