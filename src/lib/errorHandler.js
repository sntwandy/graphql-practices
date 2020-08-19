const errorHandler = (error) => {
  console.error(error.message);
  throw new Error('The server operation failed');
};

module.exports = errorHandler;