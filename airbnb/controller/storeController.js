const Home = require("../models/home");
const User = require('../models/user')



exports.getHome = (req, res, next) => {
  Home.find().then((registeredHomes) =>
    res.render("store/home-list", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb Home",
      currentPage: "Home",
      isLoggedIn:req.isLoggedIn,
       user:req.session.user
    }),
  );
};
exports.getIndex = (req, res, next) => {
  console.log("Session Values",req.session.isLoggedIn)
  Home.find().then((registeredHomes) => {
    res.render("store/index", {
      registeredHomes: registeredHomes,
      pageTitle: "airbnb index",
      currentPage: "Index",
      isLoggedIn:req.isLoggedIn
    , user:req.session.user
    });
  });
};
exports.getFavourites = async (req, res, next) => {
  const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');

  
      
      res.render("store/favourite-list", {
        favourites: user.favourites,
        pageTitle: "favourites list",
        currentPage: "Favourites",
        isLoggedIn:req.isLoggedIn,
         user:req.session.user
      });
    
  }


exports.getBookings = (req, res, next) => {
  res.render("store/bookings", {
    pageTitle: "Bookings",
    currentPage: "Bookings",
    isLoggedIn:req.isLoggedIn,
     user:req.session.user
  });
};
exports.postAddToFavourites = async (req, res, next) => {
  const homeId = req.body.id;
   const userId = req.session.user._id;
  const user = await User.findById(userId)
  if(!user.favourites.includes(homeId)){
  user.favourites.push(homeId);
   await user.save();
  }
      return res.redirect("/favourites");
    
    
};

// Showing details of home
exports.getHomeDetails = (req, res, next) => {
  const homeId = req.params.homeId;
  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("not found a home");
      res.redirect("/homes");
    } else {
      console.log("At home details ", homeId);
      res.render("store/home-detail", {
        home: home,
        pageTitle: "Home-Details",
        currentPage: "Home-Details",
        isLoggedIn:req.isLoggedIn,
         user:req.session.user
      });
    }
  });
};

exports.postDeleteFavourites =async (req, res, next) => {
  const homeId = req.params.homeId;
   const userId = req.session.user._id;
  const user = await User.findById(userId).populate('favourites');

  if(user.favourites.includes(homeId)){
    user.favourites = user.favourites.filter(fav=> fav!=homeId);
    await user.save();
  }
};
 