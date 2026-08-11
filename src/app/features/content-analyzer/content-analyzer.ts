import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AnalysisService } from '../../services/analysis';
import { AuthService } from '../../services/auth';
import { AnalysisResult } from '../../models/analysis-result';

import { TranslationService } from '../../services/translation';
import { TranslatePipe } from '../../pipes/translate';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector';

@Component({
  selector: 'app-content-analyzer',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, TranslatePipe, LanguageSelectorComponent],
  templateUrl: './content-analyzer.html',
  styleUrl: './content-analyzer.scss'
})
export class ContentAnalyzerComponent {
  text: string = '';
  contentType: string = 'linkedin';
  result: AnalysisResult | null = null;
  loading: boolean = false;
  error: string = '';

  // Improved version state
  improving: boolean = false;
  improvedText: string = '';
  improveError: string = '';
  copied: boolean = false;
  showComparison: boolean = false;

  constructor(
    private analysisService: AnalysisService,
    private authService: AuthService,
    private translationService: TranslationService,
    private router: Router
  ) {}

  get userName(): string {
    const user = this.authService.getUser();
    return user ? `${user.firstName} ${user.lastName}` : '';
  }

  onAnalyze() {
    if (!this.text.trim()) {
      this.error = this.translationService.get('placeholder_text');
      return;
    }

    this.loading = true;
    this.error = '';
    this.result = null;
    this.improvedText = '';
    this.improveError = '';
    this.showComparison = false;

    const lang = this.translationService.currentLang();

    this.analysisService.analyzeContent(this.text, this.contentType, lang).subscribe({
      next: (res) => {
        this.result = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = this.translationService.get('btn_analyzing');
        this.loading = false;
        console.error(err);
      }
    });
  }

  onImprove() {
    if (!this.text.trim() || !this.result) {
      return;
    }

    this.improving = true;
    this.improveError = '';
    this.copied = false;

    const recommendations = this.result.recommendations || [];
    const lang = this.translationService.currentLang();

    this.analysisService.improveContent(this.text, recommendations, lang).subscribe({
      next: (res) => {
        this.improvedText = res.improvedText;
        this.improving = false;
      },
      error: (err) => {
        this.improveError = "Erreur";
        this.improving = false;
        console.error(err);
      }
    });
  }

  copyToClipboard() {
    if (!this.improvedText) return;
    navigator.clipboard.writeText(this.improvedText).then(() => {
      this.copied = true;
      setTimeout(() => {
        this.copied = false;
      }, 2500);
    });
  }

  applyImprovedText() {
    if (!this.improvedText) return;
    this.text = this.improvedText;
    this.result = null;
    this.improvedText = '';
    this.showComparison = false;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  toggleComparison() {
    this.showComparison = !this.showComparison;
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}