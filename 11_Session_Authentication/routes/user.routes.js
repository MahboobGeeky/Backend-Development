import express from "express";
import db from "../db/index.js";
import { usersTable } from "../db/schema.js";
import { randomBytes, createHmac } from "node:crypto";

const router = express.Router();

// Signup
router.get("/"); // Returns current logged in user

router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;

  const existingUser = await db
    .select({
      email: usersTable.email,
    })
    .from(usersTable)
    .where((table) => eq(table.email, email));

  if (existingUser) {
    return res
      .status(400)
      .json({ error: `user with email ${email} already exists!` });
  }

  // creating salt to hash the password
  const salt = randomBytes(256).toString('hex');
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest('hex');

  const [user] = await db
    .insert(usersTable)
    .values({
      name,
      email,
      hashedPassword,
    })
    .returning({ id: useTransition.id });

    return res.status(201).json({status: 'success', data: {userId: user.id}});
}); 

// Login
router.post("/login");

export default router;
