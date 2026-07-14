import express from "express";
import cors from "cors";
import path from "path";

import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes";
import vehicleRoutes from "./routes/vehicle.routes";
import uploadRoutes from "./routes/upload.routes";
import driverRoutes from "./routes/driver.routes";
import bookingRoutes from "./routes/booking.routes";
import paymentRoutes from "./routes/payment.routes";
import dashboardRoutes from "./routes/dashboard.routes";
import reportRoutes from "./routes/report.routes";
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/drivers", driverRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/reports", reportRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("Sapthagiri Water API is Running 🚀");
});

export default app;
