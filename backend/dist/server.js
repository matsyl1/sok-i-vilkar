"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const router = express.Router();
router.get('/search', async (_req, res) => {
    res.status(200).json({ status: 'OK', message: 'search route working' });
});
module.exports = router;
//# sourceMappingURL=server.js.map