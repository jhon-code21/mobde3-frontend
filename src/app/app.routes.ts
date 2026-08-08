import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { SignupComponent } from './features/signup/signup';
import { ContentAnalyzerComponent } from './features/content-analyzer/content-analyzer';
import { HistoryComponent } from './features/history/history';
import { ForgotPasswordComponent } from './features/forgot-password/forgot-password';
import { ResetPasswordComponent } from './features/reset-password/reset-password';
import { authGuard } from './guards/auth-guard-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: '', component: ContentAnalyzerComponent, canActivate: [authGuard] },
  { path: 'history', component: HistoryComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];