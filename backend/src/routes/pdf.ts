const express = require('express');
const path = require('path');

import type { Request, Response } from 'express';

const router = express.Router();

router.get('/:filename', (req: Request, res: Response) => {
  const filename = req.params.filename;
  const filepath = path.join(__dirname, '..', '..', 'data', filename);
  res.sendFile(filepath);
});

module.exports = router;
