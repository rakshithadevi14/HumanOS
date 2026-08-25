/**
 * db.js
 *
 * Establishes the MongoDB connection using Mongoose.
 * The connection string is never hard-coded here — it is read from
 * env.mongodbUri, which itself comes only from environment variables.
 */

const mongoose = require('mongoose');
const env = require('./env');

async function connectDB() {
  try {
    await mongoose.connect(env.mongodbUri);
    // eslint-disable-next-line no-console
    console.log('[db] MongoDB connected successfully');
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[db] MongoDB connection failed:', error.message);
    // Re-throw so server.js can decide how to handle a failed startup.
    throw error;
  }
}

async function disconnectDB() {
  await mongoose.disconnect();
}

module.exports = { connectDB, disconnectDB };
