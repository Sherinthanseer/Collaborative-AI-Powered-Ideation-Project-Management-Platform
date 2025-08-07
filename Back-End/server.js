const express = require("express");
const cors=require("cors");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const connectDB = require("./config/db");

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


app.use("/auth", authRoutes);
app.use("/users", userRoutes)

const PORT = process.env.PORT || 7001;
app.listen(PORT, () => {
  console.log(`Server is run at ${PORT}`);
});
