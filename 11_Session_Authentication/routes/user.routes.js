import express from "express";
import db from "../db/index.js";
import { eq } from "drizzle-orm";
import { userSessions, usersTable } from "../db/schema.js";
import { randomBytes, createHmac } from "node:crypto";
import jwt from "jsonwebtoken";
import {ensureAuthenticated} from '../middlewares/auth.middleware.js'

const router = express.Router();

// Return current logged in user
router.get('/', ensureAuthenticated, async (req, res) => {
  const user = req.user;

  return res.json({user});
});

// Signup
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const [existingUser] = await db
    .select({
      email: usersTable.email,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));
  // .where(eq(table.email,email))

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `user with email ${email} already exists!` });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({ id: usersTable.id });

  return res.status(201).json({ status: "success", data: { userId: user.id } });
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: usersTable.id,
      email: usersTable.email,
      name: usersTable.name,
      role: usersTable.role,
      salt: usersTable.salt,
      password: usersTable.password,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (!existingUser.email) {
    return res.status(400).json({ error: `User with ${email}does not exist` });
  }

  const salt = existingUser.salt;
  const existingHas = existingUser.password;

  const newHash = createHmac("sha256", salt).update(password).digest("hex");

  if (newHash !== existingHas) {
    return res.status(400).json({ error: `incorrect password` });
  }

  // 1. SESSION BASED AUTHENTICATION
  // Generate a session for user:-
  /*

  const [session] = await db
    .insert(userSessions)
    .values({
      userId: existingUser.id
    }).returning({id: userSessions.id});

  */

  // 2. JWT BASED AUTHENTICATION
  // Generate a session for user:-
  const payload = {
    id: existingUser.id,
    email: existingUser.email,
    name: existingUser.name,
    role: existingUser.role
  };

  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return res.json({ status: "succes", token });
});

// CHANGE NAME OF USER 
router.patch('/', ensureAuthenticated, async (req, res) => {
  const {name} = req.body;
  await db.select(usersTable).set({name}).where(eq(usersTable.id, id));

  return res.json({status: 'success, name changed'});
});

export default router;
