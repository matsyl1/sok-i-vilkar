const fs = require('fs/promises');
const path = require('path');
import type { SearchResult, ParsedJson } from '../types';

const parseJson = async (query: string) => {

  const results: SearchResult = {
    query,
    documents: [],
  };

  let folderPath: string;
  let jsonFiles: string[];

  try {
    folderPath = path.resolve(__dirname, '../../data/json');
    jsonFiles = await fs.readdir(folderPath);
    // console.log(jsonFiles);

  } catch (err) {
    console.log(err);
    throw err;
  }

  for(const jsonFile of jsonFiles) {
    let json: ParsedJson;

    try {
      const filePath = path.join(folderPath, jsonFile);
      const jsonFileString = await fs.readFile(filePath, 'utf-8'); //direkte string og ikke buffer
      // console.log(jsonFileString);
      json = JSON.parse(jsonFileString);
      // console.log(json);

    } catch (err) {
      console.log(err);
      throw err;
    }

    const documentData: SearchResult['documents'][number] = {
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
    if(documentData.count > 0) {
      results.documents.push(documentData);
    }
  }
  // console.log(results);
  return results;
};

module.exports = parseJson;
