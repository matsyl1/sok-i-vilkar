export type SearchResult = {
    query: string;
    documents: {
        filename: string;
        count: number;
        matches: {
            snippet: string;
            page: number;
            queryMatch: string;
            coords: {
                x: number;
                y: number;
                w: number;
                h: number;
            };
        }[];
    }[];
};
export type ParsedJson = {
    filename: string;
    pages: {
        pageNum: number;
        items: {
            str: string;
            coords: {
                x: number;
                y: number;
                w: number;
                h: number;
            };
        }[];
    }[];
};
//# sourceMappingURL=types.d.ts.map