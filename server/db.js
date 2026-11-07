import mongoose from "mongoose";

let connectionPromise;

export function connectToDatabase() {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose);
  }

  const uri =
    process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/my_portfolio";

  if (!connectionPromise) {
    connectionPromise = mongoose.connect(uri).catch((error) => {
      connectionPromise = undefined;
      throw error;
    });
  }

  return connectionPromise;
}