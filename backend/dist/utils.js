"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const pdf = require('pdf-parse');
const pdfParser = async (query) => {
    const filePath = path.join(__dirname, '..', 'data', 'Vilkar_Toppkasko_Bil.pdf');
    const buffer = fs.readFileSync(filePath);
    const data = await pdf(buffer);
    const text = data.text.toLowerCase();
    const search = query.toLowerCase();
    const regex = new RegExp(`\\b${search}\\b`, 'gi'); // "\\b" = kun hele ord, "gi" = hele dokumentet (g) og case insensitive (i)
    const filename = path.basename(filePath);
    const matches = text.match(regex);
    const count = matches ? matches.length : 0;
    return { filename, count, matches };
};
module.exports = pdfParser;
// //lokalt test av pdf-parser: "npx ts-node src/utils.ts"
// const run = async () => {
//   const query = 'maskinskade';
//   const result = await PdfParser(query);
//   console.log(`${result.count} treffer på «${query}» i ${result.filename}`);
// };
// run();
//# sourceMappingURL=utils.js.map