const express = require('express');
const pdfParser = require('./utils');

import type { Request, Response } from 'express';

const router = express.Router();

router.get('/search', async (req: Request, res: Response) => {
  const query = req.query.q as string;

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
