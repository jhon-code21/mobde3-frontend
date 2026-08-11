import { Component, OnInit, NgZone } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

declare const google: any;

import { TranslatePipe } from '../../pipes/translate';
import { LanguageSelectorComponent } from '../../components/language-selector/language-selector';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslatePipe, LanguageSelectorComponent],
  templateUrl: './signup.html',
  styleUrl: './signup.scss'
})
export class SignupComponent implements OnInit {
  firstName: string = '';
  lastName: string = '';
  email: string = '';
  password: string = '';
  error: string = '';
  loading: boolean = false;
  googleLoading: boolean = false;

  private readonly GOOGLE_CLIENT_ID = '117940223035-0gg6emst999s8m12mkqi276n0n93v8o2.apps.googleusercontent.com';

  constructor(
    private authService: AuthService,
    private router: Router,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.initGoogleSignIn();
  }

  private initGoogleSignIn(): void {
    const tryInit = () => {
      if (typeof google !== 'undefined' && google.accounts) {
        google.accounts.id.initialize({
          client_id: this.GOOGLE_CLIENT_ID,
          callback: (response: any) => {
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

  onSignup() {
    if (!this.firstName || !this.lastName || !this.email || !this.password) {
      this.error = 'Tous les champs sont requis';
      return;
    }

    this.loading = true;
    this.error = '';

    this.authService.signup(this.email, this.password, this.firstName, this.lastName).subscribe({
      next: () => {
        this.loading = false;
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || "Erreur lors de l'inscription";
      }
    });
  }
}