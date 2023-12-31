const express = require("express");
const mongoose = require("mongoose");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("config");
const { User } = require("../models/users");
const asyncMiddleware = require("../middleware/async");

const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("Invalid Email or Password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid Email or Password.");

  const token = user.generateAuthToken();

  res.send(token);
});
function validate(req) {
  const schema = {
    email: Joi.string().min(3).max(150).required().email(),
    password: Joi.string().min(3).max(1500).required(),
  };

  return Joi.validate(req, schema);
}

module.exports = router;
