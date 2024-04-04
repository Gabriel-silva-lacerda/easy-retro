import { Injectable, Output, EventEmitter } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { Board, Notes, Card } from '../interfaces/dashBoard.interface';
import { forkJoin, switchMap } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root',
})
export class DashFunctionsService {
  @Output() deleteCardEmit = new EventEmitter();

  constructor(
    private dashboardService: DashboardService,
    private loadingService: LoadingService
  ) {}

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

  sortBoardDash(cardDash: Board[], order: 'asc' | 'desc' = 'asc') {
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
    const boards = this.dashboardService.dataBoards();
    const index = boards.findIndex((card) => card.id === id);
    const isIndexValid = index !== -1;
    this.loadingService.setLoadingForId(id as string, true);
    this.dashboardService
      .getDataCards()
      .pipe(
        switchMap((data) => {
          const filter = data.filter((item) => item.boardId === id);
          const deleteCard = filter.map((item) => {
            return this.dashboardService.deleteData<Notes>(item.id, 'cards');
          });
          return forkJoin(deleteCard);
        })
      )
      .pipe(
        switchMap(() => {
          if (isIndexValid) {
            boards.splice(index, 1);
            this.dashboardService.dataBoards.set(boards);
          }
          return this.dashboardService.deleteData<Board>(id, 'boards');
        })
      )
      .subscribe({
        next: () => this.loadingService.setLoadingForId(id as string, false),
        error: (error) => console.error('Error:', error),
      });
  }

  deleteNote(id: string | undefined, cardId: string | undefined) {
    const cards = this.dashboardService.dataCards();
    const card = cards.find((card) => card.id === cardId) as Card;

    const index = card.notes.findIndex((card) => card.id === id);
    const isIndexValid = index !== -1;
    if (isIndexValid) card.notes.splice(index, 1);

    this.dashboardService.updateCard(card).subscribe({
      error: (error) => console.error(error),
    });
  }

  deleteCard(id: string | undefined) {
    const cards = this.dashboardService.dataCards();
    const index = cards.findIndex((card) => card.id === id);
    const isIndexValid = index !== -1;

    if (isIndexValid) {
      cards.splice(index, 1);
      this.dashboardService.dataCards.set(cards);
    }

    this.dashboardService.deleteData<Notes>(id, 'cards').subscribe({
      error: (error) => console.error(error),
    });
  }

  filterData = (data: any[], value: string, propertyName: string) =>
    data.filter((item) =>
      item[propertyName].toLowerCase().includes(value.toLowerCase())
    );
}
