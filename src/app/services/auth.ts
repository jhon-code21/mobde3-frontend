import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { AuthResponse, AuthUser } from '../models/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

signup(email: string, password: string, firstName: string, lastName: string): Observable<AuthResponse> {
  return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, { email, password, firstName, lastName })
    .pipe(tap(res => this.saveSession(res)));
}

  login(email: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { email, password })
      .pipe(tap(res => this.saveSession(res)));
  }

  private saveSession(res: AuthResponse) {
    localStorage.setItem('token', res.token);
    localStorage.setItem('user', JSON.stringify(res.user));
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getUser(): AuthUser | null {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
  forgotPassword(email: string): Observable<{ message: string }> {
  return this.http.post<{ message: string }>(`${this.apiUrl}/forgot-password`, { email });
}

resetPassword(token: string, newPassword: string): Observable<{ message: string }> {
  return this.http.post<{ message: string }>(`${this.apiUrl}/reset-password`, { token, newPassword });
}
}