"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require('express');
const path = require('path');
const searchRouter = require('./server');
const app = express();
const PORT = process.env.PORT || 3000;
//serve søkruter fra server.ts
app.use('/api', searchRouter);
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