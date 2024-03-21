import { Injectable } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashBoard, Notes } from '../interfaces/dashBoard.interface';

@Injectable({
  providedIn: 'root',
})
export class DashFunctionsService {
  constructor(private dashboardService: DashboardService) {}

  increaseOrDecreaseLike(
    notes: Notes[],
    noteId: string | undefined,
    increase: boolean
  ): void {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      increase ? notes[noteIndex].likes++ : notes[noteIndex].likes--;

      this.dashboardService.updateNotes(notes[noteIndex]).subscribe({
        error: (error) => {
          console.error('Erro ao atualizar likes:', error);
        },
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

  deleteCard(id: string | undefined) {
    this.dashboardService.deleteDataDashboard(id).subscribe(() => {
      const cards = this.dashboardService.dataDash();
      const index = cards.findIndex((card) => card.id === id);
      const isIndexValid = index !== -1;

      if (isIndexValid) {
        cards.splice(index, 1);
        this.dashboardService.dataDash.set(cards);
      }
    });
  }

  deleteNotes(id: string | undefined) {
    this.dashboardService.deleteNotes(id).subscribe({
      next: () => {
        const notes = this.dashboardService.dataNotes();
        const index = notes.findIndex((note) => note.id === id);
        if (index !== -1) {
          notes.splice(index, 1);
          this.dashboardService.dataNotes.set(notes);
        }
      },
      error: (error) => {
        console.error('Erro ao excluir a nota:', error);
      }
    });
  }
}
