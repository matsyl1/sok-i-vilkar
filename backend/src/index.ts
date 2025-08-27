const express = require('express');
const path = require('path');
const searchRouter = require('./server');

import type { Request, Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

//serve søkruter fra server.ts
app.use('/api', searchRouter);

// serve statisk fil fra front
app.use(express.static(path.join(__dirname, '../public')));

// spa fallback
app.get('/*', (_req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
