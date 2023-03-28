const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const itemdb = require("../schema/itemSchema");

router.get("/", async (req, res) => {
  const lastData = await itemdb.find().sort({ id: -1 }).limit(1);
  console.log(lastData);
  console.log(lastData.length);
  console.log(lastData[0].id);
  const data = await itemdb.find();
  res.json(data);
});

router.post("/create", async (req, res) => {
  const lastData = await itemdb.find().sort({ id: -1 }).limit(1);
  const id = () => {
    if (lastData.length === 0) {
      return 1;
    } else {
      return lastData[0].id + 1;
    }
  };
  const data = await itemdb.create({
    id: id(),
    name: req.body.name,
    type: req.body.type,
    stock: req.body.stock,
  });
  await data.save();
  res.json({
    message: "item created",
  });
});

router.put("/:id", async (req, res) => {
  console.log(req.body);
  const data = await itemdb.findOne({ id: req.params.id });
  data.name = req.body.name;
  data.type = req.body.type;
  data.stock = req.body.stock;
  data.updatedAt = Date.now();
  await data.save();
  res.send("update success");
});

router.get("/:id", async (req, res) => {
  const data = await itemdb.findOne({ id: req.params.id });
  res.json(data);
});

router.delete("/:id", async (req, res) => {
  await itemdb.deleteOne({ id: req.params.id });
  res.json({
    message: "deleted",
  });
});

module.exports = router;
