"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const { parsePdfs, findPdfs } = require('../utils');
const router = express.Router();
router.get('/', async (req, res) => {
    const query = req.query.q;
    if (!query) {
        return res.status(400).json({ status: 'ERROR', message: 'missing query' });
    }
    const pdfs = await findPdfs();
    const result = await parsePdfs(query, pdfs);
    return res.status(200).json(result);
});
module.exports = router;
//# sourceMappingURL=search.js.map