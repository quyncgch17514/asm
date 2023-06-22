var mongoose = require('mongoose')
var GundamSchema = mongoose.Schema(
   {
      name: String,
      brand: String,
      quantity: Number, 
      image: String,
      video: String,
      price: Number
   }
)
var GundamModel = mongoose.model("Mô Hình", GundamSchema, "gundam");
module.exports = GundamModel;