"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const router = express.Router();
router.get('/:filename', (req, res, next) => {
    const filename = req.params.filename;
    const filepath = path.resolve(__dirname, '../../data', filename);
    res.sendFile(filepath, (err) => {
        if (err) {
            next(err);
        }
    });
});
module.exports = router;
//# sourceMappingURL=pdf.js.map