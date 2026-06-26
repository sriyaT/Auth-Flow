const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./src/routes/auth.routes");
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://auth-flow-7ud91fb8h-sriyats-projects.vercel.app/",
    ],
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "AuthFlow Backend Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
