const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch((err) => {
      console.error(err.stack || err);
      next(err);
    });
  };
};

export default asyncHandler;