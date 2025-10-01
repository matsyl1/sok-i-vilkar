/*
findPdfs: return en array of strings (navn på alle PDFer i /data)
*/

const fs = require('fs');
const path = require('path');

const findPdfs = () => {
  const filepath = path.resolve(__dirname, '../../data');

  try {
    const pdfs = fs.readdirSync(filepath);
    return pdfs;

  } catch (err)  {
    console.log(err);
    throw err;
  }
};

module.exports = findPdfs;
