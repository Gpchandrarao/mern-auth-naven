const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userRouter = require("./routes/UserRoute");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGOOSE_URL)
  .then(console.log("Mongoose connected"))
  .catch((error) => {
    console.log("error form", error);
  });

const PORT = process.env.PORT || 9000;

app.listen(PORT, () => {
  console.log(`server running at ${PORT}`);
});

app.use("/api/user", userRouter);

app.get("/api/get", (req, res) => {
  res.json({ mes: "hello" });
});
