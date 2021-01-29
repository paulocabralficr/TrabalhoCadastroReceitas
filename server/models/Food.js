const mongoose = require('mongoose')

const FoodSchema = new mongoose.Schema({
  foodName: {
    type:String,
    required: true,
  },
  ingrediente: {
    type:String,
    required: true,
  },
  modPreparo: {
    type:String,
    required: true,
  },
  rendimento: {
    type:String,
    required: true,
  },
});

const Food = mongoose.model("Food", FoodSchema)
module.exports = Food;