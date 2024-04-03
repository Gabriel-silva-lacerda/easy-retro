import { Injectable, Output, EventEmitter } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashBoard, PublicBoard } from '../interfaces/dashBoard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashFunctionsService {
  @Output() deleteCardEmit = new EventEmitter();

  constructor(private dashboardService: DashboardService) {}

  increaseOrDecreaseLike(
    card: PublicBoard,
    noteId: string | undefined,
    increase: boolean
  ): void {
    const note = card.notes.find((note) => note.id === noteId);

    if (note) {
      increase ? note.likes++ : note.likes--;

      this.dashboardService.updatePublicBoard(card).subscribe({
        error: (error) => console.error(error),
      });
    }
  }

  sortCardDash(cardDash: DashBoard[], order: 'asc' | 'desc' = 'asc') {
    return cardDash.sort((date01, date02) => {
      const dateA = new Date(date01.date);
      const dateB = new Date(date02.date);

      if (order === 'asc') {
        return dateA.getTime() - dateB.getTime();
      }

      return dateB.getTime() - dateA.getTime();
    });
  }

  deleteBoard(id: string | undefined) {
    this.dashboardService.deleteDataDashboard(id).subscribe(() => {
      const boards = this.dashboardService.dataDash();

      const index = boards.findIndex((card) => card.id === id);
      const isIndexValid = index !== -1;

      if (isIndexValid) {
        boards.splice(index, 1);
        this.dashboardService.dataDash.set(boards);
      }
    });
  }

  deleteNote(id: string | undefined, cardId: string | undefined) {
    const cards = this.dashboardService.dataPublicboard();
    const card = cards.find((card) => card.id === cardId);
    if (card) {
      const index = card?.notes.findIndex((card) => card.id === id);
      const isIndexValid = index !== -1;
      if (isIndexValid) card?.notes?.splice(index, 1);
    }

    this.dashboardService.updatePublicBoard(card).subscribe({
      error: (error) => console.error(error),
    });
  }

  deleteCard(id: string | undefined) {
    this.dashboardService.deletePublicBoard(id).subscribe({
      next: () => this.deleteCardEmit.emit(id),
      error: (error) => console.error(error),
    });
  }

  filterData = (data: any[], value: string, propertyName: string) =>
    data.filter((item) =>
      item[propertyName].toLowerCase().includes(value.toLowerCase())
    );
}
