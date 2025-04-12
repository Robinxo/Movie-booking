import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://frolicking-fairy-9e5986.netlify.app/",
];

//uses
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  }),
);

// routes import
import router from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";
import movieRouter from "./routes/movie.routes.js";
import bookingRouter from "./routes/booking.routes.js";

// routes declaration
app.use("/users", router);
app.use("/admin", adminRouter);
app.use("/movies", movieRouter);
app.use("/bookings", bookingRouter);

export default app;
