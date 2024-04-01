import {
  ChangeDetectorRef,
  Injectable,
  OnInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashBoard, Notes } from '../interfaces/dashBoard.interface';
import { forkJoin, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashFunctionsService {
  @Output() deleteNote = new EventEmitter();
  @Output() deletePublic = new EventEmitter();

  constructor(private dashboardService: DashboardService) {}

  increaseOrDecreaseLike(
    notes: Notes[],
    noteId: string | undefined,
    increase: boolean
  ): void {
    const noteIndex = notes.findIndex((note) => note.id === noteId);
    if (noteIndex !== -1) {
      increase ? notes[noteIndex].likes++ : notes[noteIndex].likes--;

      this.dashboardService.updateNote(notes[noteIndex]).subscribe({
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
        this.deleteNote.emit(id);
      },
      error: (error) => {
        console.error('Erro ao excluir a nota:', error);
      },
    });
  }

  deletePublicBoard(id: string | undefined) {
    this.dashboardService.deletePublicBoard(id).subscribe({
      next: () => {
        this.deletePublic.emit(id);
      },
      error: (error) => {
        console.error('Erro ao excluir a board:', error);
      },
    });
  }

  deletePublicBoard3(id: string | undefined) {
    const obj = {
      cardId: id,
    };

    this.dashboardService
      .deletePublicBoard(id)
      .pipe(
        switchMap(() => {
          this.deletePublic.emit(id);
          return this.dashboardService.getNotes(obj);
        })
      )
      .pipe(
        switchMap((notes) => {
          this.deleteNote.emit(id);
          const deleteNoteRequests = notes.map((note) =>
            this.dashboardService.deleteNotes(note.id)
          );
          return forkJoin(deleteNoteRequests);
        })
      )
      .subscribe({
        next: () => {
          //
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  deletePublicBoard2(id: string | undefined) {
    const obj = {
      cardId: id,
    };

    this.dashboardService
      .getNotes(obj)
      .pipe(
        switchMap((notes) => {
          const deleteNoteRequests = notes.map((note) => {
            this.deleteNote.emit(note.id);
            return this.dashboardService.deleteNotes(note.id);
          });
          return forkJoin(deleteNoteRequests);
        })
      )
      .pipe(switchMap(() => this.dashboardService.deletePublicBoard(id)))
      .subscribe({
        next: () => {
          this.deletePublic.emit(id);
        },
        error: (error) => {
          console.error(error);
        },
      });
  }

  filterData = (data: any[], value: string, propertyName: string) =>
    data.filter((item) =>
      item[propertyName].toLowerCase().includes(value.toLowerCase())
    );
}
