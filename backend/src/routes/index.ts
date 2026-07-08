import { Router } from "express";

import bookingRoutes from "./booking.routes";
import customerRoutes from "./customer.routes";
import driverRoutes from "./driver.routes";
import vehicleRoutes from "./vehicle.routes";
import paymentRoutes from "./payment.routes";

const router = Router();

router.use("/bookings", bookingRoutes);

router.use("/customers", customerRoutes);

router.use("/drivers", driverRoutes);

router.use("/vehicles", vehicleRoutes);

router.use("/payments", paymentRoutes);

export default router;
