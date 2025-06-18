import express from "express";
import helmet from "helmet";
import cors from "cors";
import incomeRoutes from "./routes/income.js";
import expensesRoutes from "./routes/expenses.js";
import userRoutes from "./routes/user.js";
import errorHandler from "./middleware/errorHandler.js";
import { verifyFirebaseToken } from "./middleware/auth.js";
import { syncFirebaseUser } from "./middleware/syncUser.js";
import { connectDB } from "./config/mongo.js";

const app = express();

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(verifyFirebaseToken, syncFirebaseUser);

// Routes
app.use("/api/income", incomeRoutes);
app.use("/api/expenses", expensesRoutes);
app.use("/api/user", userRoutes);

// Error Handler (NOTE: Comes in Last)
app.use(errorHandler);

export default async function createServer() {
  await connectDB();
  return app;
}
