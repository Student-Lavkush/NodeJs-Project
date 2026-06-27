const Home = require("../models/home");
const fs = require("fs");

exports.getAddHome = (req, res, next) => {
  res.render("host/edit-home", {
    pageTitle: "Add Home to airbnb",
    currentPage: "addHome",
    editing: false,
    isLoggedIn: req.isLoggedIn,
    user: req.session.user,
  });
};

exports.getEditHome = (req, res, next) => {
  const homeId = req.params.homeId;
  const editing = req.query.editing === "true";

  Home.findById(homeId).then((home) => {
    if (!home) {
      console.log("home not found");
      res.redirect("/host/host-home-list");
    } else {
      console.log(homeId, editing, home);
      res.render("host/edit-home", {
        home: home,
        pageTitle: "Edit your home",
        currentPage: "HostHomeList",
        editing: editing,
        isLoggedIn: req.isLoggedIn,
        user: req.session.user,
      });
    }
  });
};

exports.postAddHome = (req, res, next) => {
  //destrucure the body
  const { houseName, price, location, rating, description } = req.body;

  if (!req.file) {
    return res.status(422).send("no image found");
  }
  const photo = req.file.path;
  const home = new Home({
    houseName,
    price,
    location,
    rating,
    photo,
    description,
  });
  console.log(req.file);

  home.save().then(() => {
    console.log("home saved successfully");
  });
  res.redirect("/host/host-home-list");
};

exports.postEditHome = (req, res, next) => {
  //destrucure the body
  const { houseName, price, location, rating, description, id } = req.body;
  Home.findById(id)
    .then((home) => {
      home.houseName = houseName;
      home.price = price;
      home.location = location;
      home.rating = rating;

      home.description = description;
      if (req.file) {
        //if new file arrive
        fs.unlink(home.photo, (err) => {
          if (err) {
            conole.log("photo not found");
          }
        });
        home.photo = req.file.path;
      }
      home
        .save()
        .then((result) => {
          console.log("Home updated", result);
        })
        .catch((err) => {
          console.log("error while updating", err);
        });
    })
    .catch((err) => {
      console.log("home not found for editing", err);
    });

  res.redirect("/host/host-home-list");
};

exports.getHostHomeList = (req, res, next) => {
  Home.find().then((registeredHomes) => {
    res.render("host/host-home-list", {
      // find is like fetchAll
      registeredHomes: registeredHomes,
      pageTitle: "Host Home List",
      currentPage: "HostHomeList",
      isLoggedIn: req.isLoggedIn,
      user: req.session.user,
    });
  });
};

exports.postDeleteHome = (req, res, next) => {
  const homeId = req.params.homeId;

  Home.findByIdAndDelete(homeId)
    .then(() => {
      res.redirect("/host/host-home-list");
    })
    .catch((error) => {
      console.log("it error", error);
    });
};
