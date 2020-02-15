const AppError = require('../utils/Error');

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    success: err.status,
    stack: err.stack,
    error: err
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: err.status,
      error: err.message
    });
  } else {
    console.log(err);
    res.status(500).json({
      success: 'error',
      error: 'something unexpected happen'
    });
  }
};

const handleValidationError = err => {
  const msg = Object.values(err.errors).join(', ');
  return new AppError(msg, 400);
};

const handleDuplicateError = err => {
  const msg = `duplicate fields value for ${err.keyValue.email}`;
  return new AppError(msg, 400);
};

const handleCastError = err => {
  const msg = 'invalid id';
  return new AppError(msg, 400);
};

module.exports = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = { ...err };
    error.message = err.message;

    if (error.name === 'ValidationError') error = handleValidationError(error);
    if (error.code === 11000) error = handleDuplicateError(error);
    if (error.name === 'CastError') error = handleCastError(error);

    sendErrorProd(error, res);
  }
};
