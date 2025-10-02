"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _req, res, _next) => {
    const statusCode = err.status || 500;
    if (process.env.NODE_ENV === 'development') {
        res.status(statusCode).json({
            status: 'ERROR',
            message: err.message,
            stack: err.stack,
        });
    }
    else {
        res.status(500).json({ message: 'Noe gikk galt - prøv igjen senere' });
    }
};
module.exports = errorHandler;
//# sourceMappingURL=errorHandler.js.map