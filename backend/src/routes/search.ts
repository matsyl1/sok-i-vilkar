const express = require('express');
const { parsePdfs, findPdfs } = require('../utils');

import type { Request, Response } from 'express';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const query = req.query.q as string;

  if (!query) {
    return res.status(400).json({ status: 'ERROR', message: 'missing query' });
  }

  const pdfs = findPdfs();
  const result = await parsePdfs(query, pdfs);
  return res.status(200).json({
    status: 'OK',
    query: query,
    document: result,
  });

});

module.exports = router;
