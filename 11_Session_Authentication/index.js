import express from "express";
import userRouter from "./routes/user.routes.js";
import jwt from "jsonwebtoken";
import adminRouter from './routes/admin.routes.js';
import {authenticationMiddleware, ensureAuthenticated} from "./middlewares/auth.middleware.js";

const app = express();
const PORT = process.env.PORT ?? 8000;

// middleware to handle JSON data
app.use(express.json());

// middleware to get current logged in user
// GET CURRENT USER (current user is logged in or not)
app.use(authenticationMiddleware);

// Home page
app.get("/", (req, res) => {
  return res.json({ status: `Server is running up ` });
});


app.use("/user", userRouter);

app.use("/admin", adminRouter);

app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
