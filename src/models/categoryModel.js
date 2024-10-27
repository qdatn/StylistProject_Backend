import mongoose, { Schema } from "mongoose";

// Define the Category schema
export const categorySchema = new Schema({
  category_name: { type: String, required: true },
  description: { type: String },
});

// Create the model based on the schema
const Category = mongoose.model("Category", categorySchema);

export default Category;
