import express from "express";
import userRouter from "./routes/userRoutes.js";
import { logger } from "./middleware/logger.js";
import { notFound } from "./middleware/404.js";
import { errorHandler } from "./middleware/error.js";

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(logger);

// base url
app.get("/", (req, res) => {
  res.status(200).json({ message: "server running successfully" });
});

//user route endpoints
app.use("/api/v1/", userRouter);

// error handle middleware
app.use(notFound)
app.use(errorHandler)

export default app;
