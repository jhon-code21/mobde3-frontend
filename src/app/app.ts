import { Component } from '@angular/core';
import { ContentAnalyzerComponent } from './features/content-analyzer/content-analyzer';

@Component({
  selector: 'app-root',
  imports: [ContentAnalyzerComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}