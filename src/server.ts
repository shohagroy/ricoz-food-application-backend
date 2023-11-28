import app from "./app";
import mongoose from "mongoose";

import env from "./config";

const uri: string | undefined =
  process.env.NODE_ENV !== "production"
    ? "mongodb://127.0.0.1:27017/ricoz_food"
    : env.db_uri;

async function dbConnection() {
  try {
    if (env.db_uri) {
      await mongoose.connect(uri as string);
      app.listen(env.port, () => {
        console.log("server listening on port " + env.port);
      });
    } else {
      console.log("db uri is not defined");
    }
  } catch (err) {
    console.log(`Failed to connect database ${err}`);
  }
}

dbConnection();
