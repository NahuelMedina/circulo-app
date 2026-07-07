const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    error: {
      mensaje: err.message || "Error interno del servidor",
    },
  });
};

module.exports = errorHandler;
