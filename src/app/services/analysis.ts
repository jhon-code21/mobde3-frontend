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

  analyzeContent(text: string, type: string, lang: string = 'fr'): Observable<AnalysisResult> {
    return this.http.post<AnalysisResult>(`${this.apiUrl}/analyze`, { text, type, lang });
  }

  improveContent(text: string, recommendations: string[], lang: string = 'fr'): Observable<{ improvedText: string }> {
    return this.http.post<{ improvedText: string }>(`${this.apiUrl}/improve`, { text, recommendations, lang });
  }

  getHistory(): Observable<HistoryItem[]> {
    return this.http.get<HistoryItem[]>(`${this.apiUrl}/history`);
  }

  deleteHistoryItem(id: number): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/history/${id}`);
  }
}
