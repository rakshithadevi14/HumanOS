/**
 * server.js
 *
 * Entry point for the Human OS backend.
 *
 * Responsibilities (and only these):
 *   1. Load and validate environment configuration
 *   2. Connect to MongoDB
 *   3. Start the Express server
 *   4. Fail clearly and exit if startup fails at any step
 */

const env = require('./src/config/env');
const { connectDB } = require('./src/config/db');
const app = require('./src/app');

async function startServer() {
  try {
    await connectDB();

    app.listen(env.port, () => {
      // eslint-disable-next-line no-console
      console.log(`[server] Human OS backend running on port ${env.port} (${env.nodeEnv})`);
      // eslint-disable-next-line no-console
      console.log(`[server] Health check: http://localhost:${env.port}/api/health`);
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('[server] Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
