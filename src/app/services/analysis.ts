import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AnalysisResult } from '../models/analysis-result';
import { HistoryItem } from '../models/history';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  analyzeContent(text: string, type: string): Observable<AnalysisResult> {
    return this.http.post<AnalysisResult>(`${this.apiUrl}/analyze`, { text, type });
  }

  improveContent(text: string, recommendations: string[]): Observable<{ improvedText: string }> {
    return this.http.post<{ improvedText: string }>(`${this.apiUrl}/improve`, { text, recommendations });
  }
  getHistory(): Observable<HistoryItem[]> {
  return this.http.get<HistoryItem[]>('http://localhost:3000/api/history');
}

deleteHistoryItem(id: number): Observable<{ message: string }> {
  return this.http.delete<{ message: string }>(`http://localhost:3000/api/history/${id}`);
}
}
