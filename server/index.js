import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import authRoute from "./routes/auth.js";
import userRoute from "./routes/user.js";
import tweetRoute from "./routes/tweet.js";
import connectDB from "./models/config/db.js";

dotenv.config();
connectDB();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use("/api/bluebird/auth", authRoute);
app.use("/api/bluebird/users", userRoute);
app.use("/api/bluebird/tweets", tweetRoute);

app.get("/api/bluebird", (req, res) => {
  res.status(200).json({
    status: "ok",
  });
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} ...`);
});
