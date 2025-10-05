//lager en JSON-fil i /data/json for hver PDF i /data/pdf.

const fs = require('fs');
const path = require('path');
const { getDocument } = require('pdfjs-dist/legacy/build/pdf.mjs');

const pdfToJson = async () => {

  //henter ut navn på alle PDF-er i data/pdf
  const filepath = path.resolve(__dirname, '../data/pdf');
  const pdfs = fs.readdirSync(filepath);

  //loop over alle PDF-er, sidenummer og items for å hente ut data
  for(const pdfFile of pdfs) {
   const pdfPath = path.resolve(__dirname, '../data/pdf', pdfFile);
   const buffer = fs.readFileSync(pdfPath);
   const data = await getDocument({ data: new Uint8Array(buffer) }).promise //PDFDocumentLoadingTask -> PDFDocumentProxy-objekt
  //  console.log(data);
   const numPages = data.numPages;

    const documentData = {
      filename: pdfFile,
      pages: []
    };

    for(let pageNum = 1; pageNum <= numPages; pageNum++) {
      const page = await data.getPage(pageNum); //PDFPageProxy-objekt per side
      let textContent = await page.getTextContent();

      const pageData = { pageNum, items: [] };

      for(const item of textContent.items) {
        pageData.items.push({
          str: item.str,
          coords: {
            x: item.transform[4],
            y: item.transform[5],
            w: item.width,
            h: item.height,
          }
        })
      }
      documentData.pages.push(pageData)
    }

    //fjern .pdf og ersatt med .json
    const jsonFilename = path.basename(pdfFile, '.pdf') + '.json';

    //lagrer JSON-fil for hver PDF
    fs.writeFileSync(
      path.resolve(__dirname, '../data/json', jsonFilename),
      JSON.stringify(documentData, null, 2)
    )
  }
};

//kjør skript med "npm run pdf-to-json" (package.json script), NB - manuelt hvis nye PDF-er er lagt til.
pdfToJson();
