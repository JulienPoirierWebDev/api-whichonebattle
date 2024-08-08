import mongoose from "mongoose";

const connect = async (test: boolean) => {
  let MONGO_URI =
    process.env.NODE_ENV === "production"
      ? process.env.MONGO_URI_PRODUCTION
      : process.env.MONGO_URI_DEVELOPMENT;

  if (test && process.env.NODE_ENV === "test" && process.env.MONGO_URI_TEST) {
    MONGO_URI = process.env.MONGO_URI_TEST + Date.now();
  }

  if (!MONGO_URI) {
    MONGO_URI = "error_no_mongo_uri";
  }

  try {
    await mongoose.connect(MONGO_URI);
    await mongoose.connection.on("error", (error) => {
      throw new Error(`Error connecting to database: ${error}`);
    });
    await mongoose.connection.on("connected", () => {
      console.info(`Connected to database`);
    });
  } catch (error) {
    console.log(error);
  }
};

export default connect;
