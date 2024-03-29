const { DateTime } = require("luxon");

const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BookInstanceSchema = new Schema({
  book: { type: Schema.Types.ObjectId, ref: "Book", required: true },
  imprint: { type: String, required: true },
  status: {
    type: String,
    required: true,
    enum: ["Available", "Maintenance", "Loaned", "Reserved"],
    default: "Maintenance",
  },
  due_back: { type: Date, default: Date.now },
});

// Virtual for bookinstance's URL
BookInstanceSchema.virtual("url").get(function () {
  // We don't use an arrow function as we'll need the this object
  return `/catalog/bookinstance/${this._id}`;
});

BookInstanceSchema.virtual("due_back_formatted").get(function () {
  return this.due_back
    ? DateTime.fromJSDate(this.due_back).toLocaleString(DateTime.DATE_MED)
    : "";
});

// For date format in forms
BookInstanceSchema.virtual("due_back_formatted_form").get(function () {
  return this.due_back ? DateTime.fromJSDate(this.due_back).toISODate() : "";
});

// Export model
module.exports = mongoose.model("BookInstance", BookInstanceSchema);
