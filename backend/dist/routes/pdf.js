"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const router = express.Router();
router.get('/:filename', (req, res) => {
    const filename = req.params.filename;
    const filepath = path.join(__dirname, '..', '..', 'data', filename);
    res.sendFile(filepath);
});
module.exports = router;
//# sourceMappingURL=pdf.js.map