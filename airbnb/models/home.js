//local module
const mongoose = require("mongoose");


const homeSchema = mongoose.Schema({
  houseName: {
    type: String,
    required: true,// require true means it is essential to provide an input
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  photo: String,
  description: String,
});

// homeSchema.pre('findOneAndDelete',async function(next){
//   const homeId = this.getQuery()._id;
//   await Favourites.deleteMany({houseId:homeId});
// })

module.exports = mongoose.model('Home',homeSchema)//Home is like Before Home class

