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
        if (pdfs.length === 0) {
            throw new Error('Finner ikke noen vilkårsdokumenter');
        }
        return pdfs;
    }
    catch (err) {
        if (err instanceof Error) {
            throw err;
        }
        else {
            throw new Error('Ukjent feil');
        }
    }
};
module.exports = findPdfs;
//# sourceMappingURL=findPdfs.js.map