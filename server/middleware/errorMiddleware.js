import multer from "multer";

const errorMiddleware = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    statusCode = 400;
    message = "Image must be smaller than 5MB";
  } else if (err.message === "Only image files are allowed.") {
    statusCode = 400;
    message = "Only image files are allowed.";
  } else if (err.name === "ValidationError") {
    statusCode = 400;
    const firstError = Object.values(err.errors)[0];
    message = firstError?.message || "Validation failed";
  } else if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue || {})[0];
    message = field
      ? `${field} already exists`
      : "Duplicate value already exists";
  } else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid resource ID";
  }
  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === "development" && {
      stack: err.stack,
    }),
  });
};

export default errorMiddleware;
