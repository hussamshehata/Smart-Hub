const notFound = (req, res, next) => {
    res.status(404);
    next(new Error(`❌ Not Found - ${req.originalUrl}`));
};

export default notFound;
