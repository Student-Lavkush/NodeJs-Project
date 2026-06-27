// Core Module
const path = require("path");

// External Module
const express = require("express");
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session);//it is a function that store a session
const multer = require('multer')// it is for collecting data of photo
const DB_PATH =
  "mongodb+srv://lavkush:Lavkush8107@completecoding.wt5sp6w.mongodb.net/airbnb?appName=CompleteCOding"; //provinding database name after.net/

//Local Module
const storeRouter = require("./routes/storeRouter");
const { hostRouter } = require("./routes/hostRouter");
const {authRouter} = require("./routes/authRouter")
const rootDir = require("./utils/pathUtil");
const errorController = require("./controller/error");
const { default: mongoose } = require("mongoose");

const app = express();

//for setting ejs
app.set("view engine", "ejs");
app.set("views", "views");

const store = new MongoDBStore({
  uri:DB_PATH,
  collection:'session'// this mean i am string in the session
})

const randomString = (length) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return result;
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, randomString(10) + '-' + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
}

const multerOptions = {
  storage, fileFilter
};

app.use(express.urlencoded());
app.use(multer(multerOptions).single('photo'));

app.use(express.static(path.join(rootDir, "public")));// for making css public 
app.use("/uploads",express.static(path.join(rootDir, "uploads")));
app.use("/host/uploads",express.static(path.join(rootDir, "uploads")));
app.use("/homes/uploads",express.static(path.join(rootDir, "uploads")));

app.use(session({
  secret:"KnowledgeGate AI with complete coding",
  resave:false,
  saveUninitialized:true,
  store
}))// we have to use one middleware of session before all middleware

app.use((req,res,next)=>{
  req.isLoggedIn = req.session.isLoggedIn
  next()
})//i am assigning the session item to request for this js file

app.use(authRouter)
app.use(storeRouter);
app.use("/host",  (req,res,next)=>{
  if(req.isLoggedIn){
    next();
  }
  else{
    res.redirect("/login")
  }
})

app.use("/host", hostRouter);


app.use(errorController.error);

const PORT = 3003;



mongoose
  .connect(DB_PATH)
  .then(() => {
    console.log("coonected to mongoose");
    app.listen(PORT, () => {
      console.log(`Server running on address http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
