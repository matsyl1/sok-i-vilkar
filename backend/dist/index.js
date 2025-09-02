"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const searchRouter = require('./routes/search');
const pdfRouter = require('./routes/pdf');
const app = express();
const PORT = process.env.PORT || 3000;
//serve søk/pdf-ruter
app.use('/api/search', searchRouter);
app.use('/api/pdf', pdfRouter);
// serve statisk fil fra front
app.use(express.static(path.join(__dirname, '../public')));
// spa fallback
app.get('/*', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map