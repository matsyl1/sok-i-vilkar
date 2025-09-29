require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorHandler');
const path = require('path');
const searchRouter = require('./routes/search');
const pdfRouter = require('./routes/pdf');

import type { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

//serve søk/pdf-ruter
app.use('/api/search', searchRouter);
app.use('/api/pdf', pdfRouter);

// serve statisk fil fra front
app.use(express.static(path.join(__dirname, '../public')));

// spa fallback
app.get('/*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
