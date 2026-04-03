export const errorMiddleware = (err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    code: err.code || "SERVER_ERROR",
    timestamp: new Date().toISOString(),
    path: req.originalUrl
  });
};
