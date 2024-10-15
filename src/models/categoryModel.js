import mongoose, { Schema } from "mongoose";

// Define the Category schema
const categorySchema = new Schema({
  category_id: { type: Schema.Types.ObjectId, auto: true },
  category_name: { type: String, required: true },
  description: { type: String },
});

// Create the model based on the schema
const Category = mongoose.model("Category", categorySchema);

export default Category;
