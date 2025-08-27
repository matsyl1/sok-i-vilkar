"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const pdfParser = require('./utils');
const router = express.Router();
router.get('/search', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ status: 'ERROR', message: 'missing query' });
    }
    const result = await pdfParser(query);
    return res.status(200).json({
        status: 'OK',
        document: result.filename,
        query: query,
        nrOfMatches: result.count,
        matches: result.matches,
    });
});
module.exports = router;
//# sourceMappingURL=server.js.map