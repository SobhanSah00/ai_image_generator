'use server'

import mongoose from "mongoose";
import { DB_NAME } from "../../constants/index";

const MONGO_URI = `${process.env.MONGO_URI}/${DB_NAME}`;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined in environment variables");
}

// Global cache to store the connection (prevents multiple connections)
let cached = global.mongoose || { conn: null, promise: null };

export async function connect() {
  if (cached.conn) return cached.conn;  // If already connected, return it.

  if (!cached.promise) {
    console.log("⚡ Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected Successfully!");
  }

  global.mongoose = cached; // Store in global scope to persist across reloads
  return cached.conn;
}
