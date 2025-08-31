"use strict";
/*
findPdfs: return en array of strings (navn på alle PDFer i /data)

parsePdfs: tar imot søkeordet (query) og navnet på alle PDFer fra findPdfs. Looper igjennom alle PDFer
og henter ut tekst, splitter opp tekstdokument og kjører regex-test per linje. For hver
loop så samles "filename", "count" og "matches" i results.
*/
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const findPdfs = () => {
    const filePath = path.join(__dirname, '..', 'data');
    const pdfs = fs.readdirSync(filePath);
    return pdfs;
};
const parsePdfs = async (query, pdfs) => {
    const results = [];
    for (const pdfFile of pdfs) {
        const filePath = path.join(__dirname, '..', 'data', pdfFile);
        const buffer = fs.readFileSync(filePath);
        const data = await pdf(buffer);
        const text = data.text.toLowerCase();
        const search = query.toLowerCase();
        const regex = new RegExp(`\\b${search}\\b`, 'gi'); // "\\b" = kun hele ord, "gi" = hele dokumentet (g) og case insensitive (i)
        const lines = text.split('\n');
        const filename = path.basename(filePath);
        const matches = lines.filter((line) => regex.test(line));
        const count = matches.length;
        results.push({ filename, count, matches });
    }
    return results;
};
module.exports = { parsePdfs, findPdfs };
//# sourceMappingURL=utils.js.map