import 'dotenv/config';
import { connectMongoDB } from './connection.js';
import express from 'express';
import userRouter from './routes/user.route.js'
import { authMiddleware } from './middlewares/auth.middleware.js';


const app = express();
const PORT = process.env.PORT ?? 8000;

connectMongoDB(process.env.MONGODB_URL).then(() =>
  console.log(`MongoDB Connected`)
);

app.use(express.json()); // this parse the upcoming json data

// home route

// app.use('/', async (req, res) => {
//     return res.json("this is home router of server");
// });

// for authentication
app.use(authMiddleware);


app.use('/user', userRouter);

app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
