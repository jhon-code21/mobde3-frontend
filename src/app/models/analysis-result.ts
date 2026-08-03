export interface AnalysisCriteria {
  name: string;
  score: number;
}

export interface AnalysisResult {
  globalScore: number;
  criteria: AnalysisCriteria[];
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
  contentType: string;
}