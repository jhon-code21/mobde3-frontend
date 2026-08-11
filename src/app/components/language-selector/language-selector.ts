import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationService, Language } from '../../services/translation';

@Component({
  selector: 'app-language-selector',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="lang-selector">
      <button class="lang-btn" (click)="toggleDropdown()">
        <span class="flag-icon">{{ currentFlag }}</span>
        <span class="lang-code">{{ currentLang.toUpperCase() }}</span>
        <svg class="chevron" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"/></svg>
      </button>

      <div class="lang-dropdown" *ngIf="isOpen">
        <button class="lang-opt" [class.active]="currentLang === 'fr'" (click)="selectLang('fr')">
          <span class="flag">🇫🇷</span> Français
        </button>
        <button class="lang-opt" [class.active]="currentLang === 'en'" (click)="selectLang('en')">
          <span class="flag">🇬🇧</span> English
        </button>
        <button class="lang-opt" [class.active]="currentLang === 'ar'" (click)="selectLang('ar')">
          <span class="flag">🇸🇦</span> العربية
        </button>
      </div>
    </div>
  `,
  styles: [`
    .lang-selector {
      position: relative;
      display: inline-block;
    }

    .lang-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      padding: 0.4rem 0.8rem;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 9999px;
      color: #f8fafc;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s ease;

      &:hover {
        background: #334155;
        border-color: #475569;
      }
    }

    .flag-icon { font-size: 0.95rem; }

    .lang-dropdown {
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      width: 140px;
      background: #1e293b;
      border: 1px solid #334155;
      border-radius: 12px;
      padding: 0.35rem;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
      z-index: 200;
      display: flex;
      flex-direction: column;
      gap: 2px;
      animation: fadeIn 0.2s ease;
    }

    :host-context([dir="rtl"]) .lang-dropdown {
      right: auto;
      left: 0;
    }

    .lang-opt {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      padding: 0.5rem 0.7rem;
      background: transparent;
      border: none;
      border-radius: 8px;
      color: #cbd5e1;
      font-family: inherit;
      font-size: 0.82rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;

      &:hover {
        background: #334155;
        color: #ffffff;
      }

      &.active {
        background: rgba(99, 102, 241, 0.2);
        color: #818cf8;
        font-weight: 700;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-4px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LanguageSelectorComponent {
  isOpen: boolean = false;

  constructor(private translationService: TranslationService) {}

  get currentLang(): Language {
    return this.translationService.currentLang();
  }

  get currentFlag(): string {
    switch (this.currentLang) {
      case 'en': return '🇬🇧';
      case 'ar': return '🇸🇦';
      default: return '🇫🇷';
    }
  }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  selectLang(lang: Language) {
    this.translationService.setLanguage(lang);
    this.isOpen = false;
  }
}
