import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashFunctionsService } from '../../service/dash-functions.service';
import { MoreListComponent } from '../more-list/more-list.component';
import { Notes, PublicBoard } from '../../interfaces/dashBoard.interface';
import { MatIcon } from '@angular/material/icon';
import { NgStyle } from '@angular/common';
import { PublicBoardNotesComponent } from '../public-board-notes/public-board-notes.component';
import { DashboardService } from '../../service/dashboard.service';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    MoreListComponent,
    MatIcon,
    NgStyle,
    PublicBoardNotesComponent,
    ColorPickerComponent,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  @Input() notes: Notes[] = [];
  @Input() isActive!: number | null | boolean;
  @Input() note!: Notes;
  @Input() index!: number;

  @Output() deleteNote = new EventEmitter();

  isComponent = false;
  isColor = false;
  selectedColor: string | null = null;

  constructor(
    private dashFunctionsService: DashFunctionsService,
    private dashboardService: DashboardService
  ) {}

  isActiveMore = (index: number) =>
    (this.isActive = this.isActive === index ? null : index);

  isColorActive = (boll: boolean) => {
    this.isActive = false;
    this.isColor = boll;
  };

  increaseLike = (noteId: string | undefined) =>
    this.dashFunctionsService.increaseOrDecreaseLike(this.notes, noteId, true);

  decreaseLike = (noteId: string | undefined) =>
    this.dashFunctionsService.increaseOrDecreaseLike(this.notes, noteId, false);

  isActiveComponent = (boll: boolean) => {
    this.isComponent = boll;
    this.isActive = boll;
  };

  changeColor(color: string) {
    this.isColor = false;
    this.note.background = color;

    this.dashboardService.updateNote(this.note).subscribe({
      error: (error) => {
        console.error(error);
      },
    });
  }
}
