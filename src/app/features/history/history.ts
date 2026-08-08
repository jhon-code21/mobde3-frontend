import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AnalysisService } from '../../services/analysis';
import { HistoryItem } from '../../models/history';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './history.html',
  styleUrl: './history.scss'
})
export class HistoryComponent implements OnInit {
  items: HistoryItem[] = [];
  loading: boolean = true;
  error: string = '';

  constructor(private analysisService: AnalysisService) {}

  ngOnInit() {
    this.loadHistory();
  }

  loadHistory() {
    this.loading = true;
    this.analysisService.getHistory().subscribe({
      next: (res) => {
        this.items = res;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Erreur lors du chargement de l'historique";
        this.loading = false;
        console.error(err);
      }
    });
  }

  onDelete(id: number) {
    this.analysisService.deleteHistoryItem(id).subscribe({
      next: () => {
        this.items = this.items.filter(item => item.id !== id);
      },
      error: (err) => console.error(err)
    });
  }
}
