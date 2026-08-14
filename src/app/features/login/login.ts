import { Component, OnInit, NgZone } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

// Typage du SDK Google GSI chargé depuis index.html
declare const google: any;

import { TranslatePipe } from '../../pipes/translate';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink, TranslatePipe, LanguageSelectorComponent],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;
  googleLoading: boolean = false;

  // Google Client ID
 private readonly GOOGLE_CLIENT_ID = '289907519997-rgj94rfgjrk6jcnj3r512174ratll2ct.apps.googleusercontent.com';

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.initGoogleSignIn();
  }

  private initGoogleSignIn(): void {
    // Attendre que le SDK Google soit chargé
    const tryInit = () => {
      if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
          client_id: this.GOOGLE_CLIENT_ID,
          callback: (response: any) => {
            // Exécuter dans la zone Angular pour déclencher la détection de changements
            this.ngZone.run(() => this.handleGoogleCredential(response.credential));
          }
        });
      } else {
        setTimeout(tryInit, 300);
      }
    };
    tryInit();
  }

  onGoogleLogin(): void {
    if (typeof google !== 'undefined' && google.accounts) {
      google.accounts.id.prompt();
    }
  }

  private handleGoogleCredential(credential: string): void {
    this.googleLoading = true;
    this.error = '';

    this.authService.googleLogin(credential).subscribe({
      next: () => {
        this.googleLoading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.googleLoading = false;
        this.error = err.error?.error || 'Erreur lors de la connexion avec Google';
      }
    });
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.error = 'Tous les champs sont requis';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Erreur de connexion';
      }
    });
  }
}