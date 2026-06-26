const express = require("express");
const cors = require("cors");
const app = express();

const authRoutes = require("./src/routes/auth.routes");
app.use(express.json());
app.use((req, res, next) => {
  console.log("Origin:", req.headers.origin);
  next();
});
const allowedOrigins = [
  "http://localhost:5173",
  "https://auth-flow-l9d8zg8h9-sriyats-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
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
