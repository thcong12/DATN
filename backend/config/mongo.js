import mongoose from "mongoose";

const connectMongoDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected db');
  } catch (error) {
    console.log(`Error:${error.message}`);
    process.exit(1);
  }
};
export default connectMongoDB;