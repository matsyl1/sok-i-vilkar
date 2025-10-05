const express = require('express');
const parseJson = require('../utils/parseJson');

import type { Request, Response, NextFunction } from 'express';
import { SearchResult } from '../types';

const router = express.Router();

router.get('/', async (req: Request, res: Response, next: NextFunction ) => {
  const query = (req.query.q as string);
  const cleanQuery = query.replace(/[^a-zA-Z0-9åæøÅÆØ ]/g, '').trim();

  if (!cleanQuery) {
    return res.status(400).json({ status: 'ALERT', message: 'Søk må inneholde et ord' });
  }

  if(cleanQuery.length > 15) {
    return res.status(400).json({ status: 'ALERT', message: 'Søk må være kortere' });
  }

  try {
    const result: SearchResult = await parseJson(cleanQuery);

    if(result.documents.some(document => document.matches.length > 10)) {
      return res.status(400).json({ status: 'ALERT', message: 'Søk må være mer spesifikt' });
    } else {
      return res.status(200).json({ status: 'OK', ...result });
    }

  } catch (err) {
    console.log(err);
    next(err);
    return;
  }

});

module.exports = router;
