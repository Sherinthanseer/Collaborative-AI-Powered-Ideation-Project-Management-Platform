const express = require("express");
const connectDB = require("./config/db");
const cors=require("cors")
require("dotenv").config();

const app = express();
connectDB();
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-type", "Authorization"],
  })
);
app.use(express.json());

const authRoutes = require("./routes/authRoutes");

app.use("/auth", authRoutes);

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server is run at ${PORT}`);
});
