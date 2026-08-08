import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss'
})
export class ResetPasswordComponent implements OnInit {
  token: string = '';
  newPassword: string = '';
  message: string = '';
  error: string = '';
  loading: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.token = this.route.snapshot.queryParamMap.get('token') || '';
    if (!this.token) {
      this.error = 'Lien invalide ou expiré';
    }
  }

  onSubmit() {
    if (!this.newPassword) {
      this.error = 'Le nouveau mot de passe est requis';
      return;
    }

    this.loading = true;
    this.error = '';
    this.message = '';

    this.authService.resetPassword(this.token, this.newPassword).subscribe({
      next: (res) => {
        this.loading = false;
        this.message = res.message;
        setTimeout(() => this.router.navigate(['/login']), 2000);
      },
      error: (err) => {
        this.loading = false;
        this.error = err.error?.error || 'Erreur lors de la réinitialisation';
      }
    });
  }
}