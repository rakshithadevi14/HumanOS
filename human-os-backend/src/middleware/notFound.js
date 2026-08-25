/**
 * notFound.js
 *
 * Catches any request that didn't match a defined route and forwards
 * a consistent, structured error to the centralized error handler
 * rather than letting Express return its default HTML 404 page.
 */

function notFound(req, res, next) {
  const error = new Error(`Route not found: ${req.method} ${req.originalUrl}`);
  error.statusCode = 404;
  error.code = 'ROUTE_NOT_FOUND';
  next(error);
}

module.exports = notFound;
