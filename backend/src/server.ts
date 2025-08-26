const express = require('express');

import type { Request, Response } from 'express';

const router = express.Router();

router.get('/search', async (req: Request, res: Response) => {
  // res.status(200).json({ status: 'OK', message: 'search route working' });
  const query = req.query.q as string;
  if (!query) {
    return res.status(400).json({ status: 'ERROR', message: 'missing query' });
  }

  return res.status(200).json({ status: 'OK', message: `query recieved by backend: ${query}` });
});

module.exports = router;
