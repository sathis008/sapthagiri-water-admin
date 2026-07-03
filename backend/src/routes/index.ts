import customerRoutes from "./customer.routes";
import router from "./vehicle.routes";
import vehicleRoutes from "./vehicle.routes";

router.use("/customers", customerRoutes);

router.use("/vehicles", vehicleRoutes);