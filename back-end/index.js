const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(bodyParser.json(), urlencodedParser);
app.use(cors());

const dbdata = require("./src/schema/adminSchema");
mongoose.connect("mongodb://localhost/admin");

const verifyJWT = (req, res, next) => {
  console.log(req.headers);
  const token = req.headers["token"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, "secret", (err, decoded) => {
      if (err) {
        res.json({
          isLoggedIn: false,
          message: "Authentication failed",
        });
      } else {
        req.user = {};
        req.user.id = decoded.id;
        req.user.name = decoded.name;
        next();
      }
    });
  } else {
    res.json({ message: "Incorrect Token Given", isLoggedIn: false });
  }
};

app.post("/register", async (req, res) => {
  const checkEmail = await dbdata.findOne({ email: req.body.email });
  if (checkEmail) {
    res.json({
      message: "Email has been taken",
    });
  } else {
    res.json({
      message: "Email avalaible",
    });
    const totalData = await dbdata.find();
    const cryptedPassword = await bcrypt.hash(req.body.password, 10);
    const data = await dbdata.create({
      id: totalData.length + 1,
      name: req.body.name,
      email: req.body.email,
      password: cryptedPassword,
    });
    await data.save();
  }
});

app.post("/login", async (req, res) => {
  const findUser = await dbdata.findOne({ email: req.body.email });
  if (findUser) {
    const match = await bcrypt.compare(req.body.password, findUser.password);
    if (match) {
      const payload = {
        id: findUser._id,
        name: findUser.name,
      };
      jwt.sign(payload, "secret", { expiresIn: 86400 }, (err, token) => {
        if (err) {
          res.json({
            message: err,
          });
        } else {
          res.json({ message: "Success", token: "Bearer " + token });
        }
      });
    } else {
      res.json({
        message: "The password you entered is incorrect",
      });
    }
  } else {
    res.json({
      message: "This email doesn't exist in our database",
    });
  }
});

app.get("/auth", verifyJWT, (req, res) => {
  res.json({
    isLoggedIn: true,
    name: req.user.name,
  });
});

const itemRouter = require("./src/router/item");

app.use("/item", itemRouter);

app.listen(4000, () => {
  console.log("connected");
});
