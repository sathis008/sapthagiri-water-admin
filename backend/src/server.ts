import dotenv from "dotenv";

import app from "./app";

import connectDB from "./config/database";
import { ensureDriverLicenseIndex } from "./utils/driverIndex";

dotenv.config();
console.log("ENV:", process.env.MONGODB_URI);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    await ensureDriverLicenseIndex();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

startServer();
