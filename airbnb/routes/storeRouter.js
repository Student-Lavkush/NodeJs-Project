// External Module
const express = require("express");
const storeRouter = express.Router();
const storeController = require("../controller/storeController");

storeRouter.get("/", storeController.getIndex);
storeRouter.get("/homes", storeController.getHome);
storeRouter.get("/bookings", storeController.getBookings);
storeRouter.get("/favourites", storeController.getFavourites);
storeRouter.get("/homes/:homeId", storeController.getHomeDetails);
storeRouter.post("/favourites", storeController.postAddToFavourites);
storeRouter.post(
  "/favourites/delete/:homeId",
  storeController.postDeleteFavourites,
);

module.exports = storeRouter;
