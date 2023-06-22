var mongoose = require('mongoose')
var LegoSchema = mongoose.Schema(
   {
      name: String,
      brand: String,
      quantity: Number, 
      image: String,
      video: String,
      price: Number
   }
)
var LegoModel = mongoose.model("Lego", LegoSchema, "lego");
module.exports = LegoModel;