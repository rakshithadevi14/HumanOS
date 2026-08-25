/**
 * errorHandler.js
 *
 * Centralized Express error-handling middleware. Every thrown or
 * forwarded (next(error)) error in the application is normalized into
 * a single consistent JSON response shape:
 *
 *   { success: false, error: { code, message } }
 *
 * Stack traces are logged server-side but never sent to the client,
 * and are omitted entirely from the response regardless of
 * environment, to avoid leaking internal implementation details.
 */

const env = require('../config/env');

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  const statusCode = err.statusCode && Number.isInteger(err.statusCode) ? err.statusCode : 500;
  const code = err.code || 'INTERNAL_SERVER_ERROR';
  const message = err.message || 'An unexpected error occurred.';

  if (!env.isProduction) {
    // eslint-disable-next-line no-console
    console.error('[error]', err);
  } else {
    // eslint-disable-next-line no-console
    console.error(`[error] ${statusCode} ${code}: ${message}`);
  }

  res.status(statusCode).json({
    success: false,
    error: { code, message },
  });
}

module.exports = errorHandler;
