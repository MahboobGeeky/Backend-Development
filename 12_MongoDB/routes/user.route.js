import express from "express";
import 'dotenv/config';
import User from "../models/user.model.js";
import { createHmac, randomBytes } from "node:crypto";
import { ensureAuthenticated } from "../middlewares/auth.middleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

// Change user's name
router.patch('/', ensureAuthenticated, async (req, res) => {
  const { name } = req.body;

  await User.findByIdAndUpdate(req.user._id, {
    name,
  });

  return res.json({ status: 'success' });
});

// get all users -> ADMIN ROUTE

router.get('/', ensureAuthenticated, async (req, res) => {
  return res.status(201).json(req.user);
  
});

// signup route
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `User with email ${email} already exist` });
  }

  // password hashing
  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const user = await User.insertOne({
    name,
    email,
    password: hashedPassword,
    salt,
  });

  return res.status(201).json({ status: "success", data: { id: user._id } });
});

// LOGIN ROUTE
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const existingUser = await User.findOne({
    email,
  });

  if (!existingUser) {
    return res
      .status(401)
      .json({ error: `User does not exist with this email ${email}` });
  }

  const salt = existingUser.salt;
  const hashedPassword = existingUser.password;

  const newHashed = createHmac("sha256", salt).update(password).digest("hex");

  if (hashedPassword !== newHashed) {
    return res.status(401).json({ error: `Incorrect Password` });
  }

  const payload = {
    _id: existingUser._id, // mongoose provides _id
    name: existingUser.name,
    email: existingUser.email,
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  // console.log(req.user);

  return res.status(200).json({ status: "Success", token });

});

export default router;
