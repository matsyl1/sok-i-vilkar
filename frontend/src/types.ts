export type SearchResult = {
  status: string;
  query: string;
  document: {
    filename: string;
    count: number;
    matches: string[];
  };
};
