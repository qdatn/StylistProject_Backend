import mongoose, { Schema } from "mongoose";

// Define Search History Schema
const searchHistorySchema = new Schema({
  history_id: { type: String, required: true, auto: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  search_query: { type: String, required: true },
  create_date: { type: Date, default: Date.now },
});

const SearchHistory = mongoose.model("SearchHistory", searchHistorySchema);

export default SearchHistory;
