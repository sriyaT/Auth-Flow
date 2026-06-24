const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./src/routes/auth.routes");
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
