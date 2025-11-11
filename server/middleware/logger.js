// server/middleware/logger.js

export const logger = (req, res, next) => {
    const now = new Date().toISOString();
    console.log(`[${now}] ${req.method} ${req.originalUrl}`);
    next(); // important! pass control to next middleware or route
};
