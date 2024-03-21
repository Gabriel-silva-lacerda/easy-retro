import { Component, Input } from '@angular/core';
import { DashFunctionsService } from '../../service/dash-functions.service';
import { MoreListComponent } from '../more-list/more-list.component';
import { Notes, PublicBoard } from '../../interfaces/dashBoard.interface';
import { MatIcon } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { PublicBoardNotesComponent } from '../public-board-notes/public-board-notes.component';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [MoreListComponent, MatIcon, NgStyle, PublicBoardNotesComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  @Input() notes: Notes[] = [];
  @Input() isActive!: number | null | boolean;
  @Input() note!: Notes;
  @Input() index!: number;
  isTextarea = false;
  isColor = false;
  selectedColor: string | null = null;

  constructor(
    private dashFunctionsService: DashFunctionsService,
    private dashboardService: DashboardService
  ) {}

  isActiveMore = (index: number) =>
    (this.isActive = this.isActive === index ? null : index);

  increaseLike = (noteId: string | undefined) =>
    this.dashFunctionsService.increaseOrDecreaseLike(this.notes, noteId, true);

  decreaseLike = (noteId: any) =>
    this.dashFunctionsService.increaseOrDecreaseLike(this.notes, noteId, false);

  isActiveTextarea = (boll: boolean) => {
    this.isTextarea = boll;
    this.isActive = boll;
  };

  isColorActive = (boll: boolean) => {
    this.isColor = boll;
  };

  changeColor(color: string) {
    this.isColor = false;
    this.note.background = color;

    this.dashboardService.updateNotes(this.note).subscribe({
      error: (error) => {
        console.error('Erro ao atualizar likes:', error);
      },
    });
  }
}
