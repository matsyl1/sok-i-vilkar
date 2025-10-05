"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require('fs/promises');
const path = require('path');
const parseJson = async (query) => {
    const results = {
        query,
        documents: [],
    };
    let folderPath;
    let jsonFiles;
    try {
        folderPath = path.resolve(__dirname, '../../data/json');
        jsonFiles = await fs.readdir(folderPath);
        // console.log(jsonFiles);
    }
    catch (err) {
        console.log(err);
        throw err;
    }
    for (const jsonFile of jsonFiles) {
        let json;
        try {
            const filePath = path.join(folderPath, jsonFile);
            const jsonFileString = await fs.readFile(filePath, 'utf-8'); //direkte string og ikke buffer
            // console.log(jsonFileString);
            json = JSON.parse(jsonFileString);
            // console.log(json);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
        const documentData = {
            filename: json.filename,
            count: 0,
            matches: [],
        };
        const search = query.toLowerCase();
        const regex = new RegExp(`\\b${search}\\b`, 'gi'); // "\\b" = kun hele ord, "gi" = hele dokumentet (g) og case insensitive (i)
        for (const page of json.pages) {
            for (const item of page.items) {
                if (regex.test(item.str)) {
                    documentData.matches.push({
                        snippet: item.str,
                        queryMatch: query,
                        page: page.pageNum,
                        coords: item.coords,
                    });
                    documentData.count++;
                }
            }
        }
        //push til documentData hvis count > 0 (tidligere håndtert i frontend)
        if (documentData.count > 0) {
            results.documents.push(documentData);
        }
    }
    // console.log(results);
    return results;
};
module.exports = parseJson;
//# sourceMappingURL=parseJson.js.map