"use strict";
/*
findPdfs: return en array of strings (navn på alle PDFer i /data)
*/
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs');
const path = require('path');
const findPdfs = () => {
    const filepath = path.resolve(__dirname, '../../data');
    try {
        const pdfs = fs.readdirSync(filepath);
        return pdfs;
    }
    catch (err) {
        console.log(err);
        throw err;
    }
};
module.exports = findPdfs;
//# sourceMappingURL=findPdfs.js.map