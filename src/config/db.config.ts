//importing modules
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

//connection string to mongo atlas &appName=Cluster0
const connectionString = process.env.MONGODB_URI!;

const options = {
  autoIndex: false, // Don't build indexes
  maxPoolSize: 10, // Maintain up to 10 socket connections
  serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
  socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
  family: 4, // Use IPv4, skip trying IPv6
};

//db connection
export const db = mongoose
  .connect(connectionString, options)
  .then((res) => {
    if (res) {
      console.log(
        `Database connection succeffully to ${mongoose.connection.db.databaseName}`
      );
    }
  })
  .catch((err) => {
    console.log(err);
  });
