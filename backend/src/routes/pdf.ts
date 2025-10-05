const express = require('express');
const path = require('path');

import type { Request, Response, NextFunction } from 'express';

const router = express.Router();

router.get('/:filename', (req: Request, res: Response, next: NextFunction ) => {
  const filename = req.params.filename;
  const filepath = path.resolve(__dirname, '../../data/pdf', filename);

  res.sendFile(filepath, (err) => { //async feil
    if(err) {
      next(err);
    }
  });
});

module.exports = router;
