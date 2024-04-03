import { Injectable, Output, EventEmitter } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Board, Notes, Card } from '../interfaces/dashBoard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashFunctionsService {
  @Output() deleteCardEmit = new EventEmitter();

  constructor(private dashboardService: DashboardService) {}

  increaseOrDecreaseLike(
    card: Card,
    noteId: string | undefined,
    increase: boolean
  ): void {
    const note = card.notes.find((note) => note.id === noteId);

    if (note) {
      increase ? note.likes++ : note.likes--;

      this.dashboardService.updateCard(card).subscribe({
        error: (error) => console.error(error),
      });
    }
  }

  sortCardDash(cardDash: Board[], order: 'asc' | 'desc' = 'asc') {
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
    this.dashboardService.deleteData<Board>(id, 'boards').subscribe(() => {
      const boards = this.dashboardService.dataBoards();

      const index = boards.findIndex((card) => card.id === id);
      const isIndexValid = index !== -1;

      if (isIndexValid) {
        boards.splice(index, 1);
        this.dashboardService.dataBoards.set(boards);
      }
    });
  }

  deleteNote(id: string | undefined, cardId: string | undefined) {
    const cards = this.dashboardService.dataCards();
    const card = cards.find((card) => card.id === cardId);
    if (card) {
      const index = card?.notes.findIndex((card) => card.id === id);
      const isIndexValid = index !== -1;
      if (isIndexValid) card?.notes?.splice(index, 1);
    }

    this.dashboardService.updateCard(card).subscribe({
      error: (error) => console.error(error),
    });
  }

  deleteCard(id: string | undefined) {
    this.dashboardService.deleteData<Notes>(id, 'cards').subscribe({
      next: () => this.deleteCardEmit.emit(id),
      error: (error) => console.error(error),
    });
  }

  filterData = (data: any[], value: string, propertyName: string) =>
    data.filter((item) =>
      item[propertyName].toLowerCase().includes(value.toLowerCase())
    );
}
