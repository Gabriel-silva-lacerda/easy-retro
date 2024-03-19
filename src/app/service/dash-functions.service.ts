import { Injectable } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { dashBoard } from '../interfaces/dashBoard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashFunctionsService {
  constructor(private dashboardService: DashboardService) {}

  sortCardDash(cardDash: dashBoard[], order: 'asc' | 'desc' = 'asc') {
    return cardDash.sort((date01, date02) => {
      const dateA = new Date(date01.date);
      const dateB = new Date(date02.date);

      if (order === 'asc') {
        return dateA.getTime() - dateB.getTime();
      }

      return dateB.getTime() - dateA.getTime();
    });
  }

  deleteCard(id: string | undefined) {
    this.dashboardService.deleteDataDashboard(id).subscribe(() => {
      const cards = this.dashboardService.dataDash();
      const index = cards.findIndex((card: dashBoard) => card.id === id);
      const isIndexValid = index !== -1;

      if (isIndexValid) {
        cards.splice(index, 1);
        this.dashboardService.dataDash.set(cards);
      }
    });
  }
}
