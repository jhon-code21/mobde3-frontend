import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AnalysisService } from '../../services/analysis';
import { AuthService } from '../../services/auth';
import { AnalysisResult } from '../../models/analysis-result';

@Component({
  selector: 'app-content-analyzer',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './content-analyzer.html',
  styleUrl: './content-analyzer.scss'
})
export class ContentAnalyzerComponent {
  text: string = '';
  contentType: string = 'linkedin';
  result: AnalysisResult | null = null;
  loading: boolean = false;
  error: string = '';

  constructor(
    private analysisService: AnalysisService,
    private authService: AuthService,
    private router: Router
  ) {}

get userName(): string {
  const user = this.authService.getUser();
  return user ? `${user.firstName} ${user.lastName}` : '';
}
  onAnalyze() {
    if (!this.text.trim()) {
      this.error = 'Le texte est requis';
      return;
    }

    this.loading = true;
    this.error = '';
    this.result = null;

    this.analysisService.analyzeContent(this.text, this.contentType).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Erreur lors de l'analyse";
        this.loading = false;
        console.error(err);
      }
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}