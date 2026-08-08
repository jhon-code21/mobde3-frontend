export interface HistoryCriteria {
  name: string;
  score: number;
}

export interface HistoryItem {
  id: number;
  contentType: string;
  originalContent: string;
  improvedContent: string | null;
  globalScore: number;
  createdAt: string;
  criteria: HistoryCriteria[];
  recommendations: string[];
}