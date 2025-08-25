const express = require('express');

import type { Request, Response } from 'express';

const router = express.Router();

router.get('/search', async (_req: Request, res: Response) => {
  res.status(200).json({ status: 'OK', message: 'search route working' });
});

module.exports = router;
