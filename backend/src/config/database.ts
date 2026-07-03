import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
  try {
    const connection = await mongoose.connect(process.env.MONGODB_URI as string);

    console.log('✅ MongoDB Connected');
    console.log(`Host: ${connection.connection.host}`);
    console.log(`Database: ${connection.connection.name}`);
  } catch (error) {
    console.error('❌ MongoDB Connection Failed');
    console.error(error);

    process.exit(1);
  }
};

export default connectDB;
