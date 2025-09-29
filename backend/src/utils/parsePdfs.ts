/*
parsePdfs: tar imot søkeordet (query) og navnet på alle PDFer fra findPdfs. Bruker 3x loop (PDF-er, sider og items)
for å hente ut data. Funksjon gir ferdig strukturert JSON-objekt som sendes til frontend via search.ts ved søk.
*/

const fs = require('fs');
const path = require('path');
const { getDocument } = require('pdfjs-dist/legacy/build/pdf.mjs');
import type { SearchResult } from '../types';

const parsePdfs = async (query: string, pdfs: string[]) => {

  const results: SearchResult = {
    query,
    documents: [],
  };

  for (const pdfFile of pdfs) {
    const filePath = path.resolve(__dirname, '../../data', pdfFile);
    const buffer = fs.readFileSync(filePath);
    const data = await getDocument({ data: new Uint8Array(buffer) }).promise; //PDFDocumentLoadingTask -> PDFDocumentProxy-objekt
    const numPages = data.numPages;
    // console.log(data);

    const documentData: SearchResult['documents'][number] = {
      filename: pdfFile,
      count: 0,
      matches: [],
    };
    // console.log(documentData);
    results.documents.push(documentData);


    for (let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await data.getPage(pageNum); //PDFPageProxy-objekt per side
      const textContent = await page.getTextContent();
      // console.log(textContent);

      const search = query.toLowerCase();
      const regex = new RegExp(`\\b${search}\\b`, 'gi'); // "\\b" = kun hele ord, "gi" = hele dokumentet (g) og case insensitive (i)

      for (const item of textContent.items) {
        // console.log(textContent.items);
        if (regex.test(item.str)) {
          documentData.matches.push({
            snippet: item.str,
            queryMatch: query,
            page: pageNum,
            coords: {
              x: item.transform[4],
              y: item.transform[5],
              w: item.width,
              h: item.height,
            },
          });
          documentData.count++;
        }
      }
    }
  }
  return results;
};

module.exports = parsePdfs;
