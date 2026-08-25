/**
 * cors.js
 *
 * CORS is restricted to a single known frontend origin, read from
 * CLIENT_ORIGIN. A wildcard origin ("*") is intentionally never used,
 * since this API will later serve authenticated, user-scoped data.
 */

const env = require('./env');

const corsOptions = {
  origin: env.clientOrigin,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

module.exports = corsOptions;
