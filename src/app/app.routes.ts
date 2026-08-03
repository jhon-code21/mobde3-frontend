import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login';
import { SignupComponent } from './features/signup/signup';
import { ContentAnalyzerComponent } from './features/content-analyzer/content-analyzer';
import { authGuard } from './guards/auth-guard-guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: '', component: ContentAnalyzerComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];