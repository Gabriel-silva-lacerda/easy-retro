import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PublicBoardNotesComponent } from '../public-board-notes/public-board-notes.component';
import { DashboardService } from '../../service/dashboard.service';
import { Notes, PublicBoard } from '../../interfaces/dashBoard.interface';
import { DashFunctionsService } from '../../service/dash-functions.service';
import { MoreListComponent } from '../more-list/more-list.component';
import { AsyncPipe, JsonPipe, NgStyle } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';

@Component({
  selector: 'app-public-board-name',
  standalone: true,
  imports: [
    MatIconModule,
    PublicBoardNotesComponent,
    MoreListComponent,
    NgStyle,
    NotesComponent,
    JsonPipe,
    AsyncPipe,
  ],
  templateUrl: './public-board-name.component.html',
  styleUrl: './public-board-name.component.scss',
})
export class PublicBoardNameComponent implements OnInit {
  @ViewChild(PublicBoardNotesComponent)
  publicBoardNotesComponent!: PublicBoardNotesComponent;
  @Input() board!: PublicBoard;
  value = false;
  isActive: number | null = null;
  notes: Notes[] = this.dashboardService.dataNotes();;

  constructor(
    private dashboardService: DashboardService,
    private dashFunctionsService: DashFunctionsService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getNotes().subscribe((data) => {
      this.notes = this.dashboardService.dataNotes();

      const filterData = this.notes.filter(
        (value) => value.id_card === this.board.id
      );

      this.notes = filterData;
      this.dashboardService.dataNotes.set(data);
    });
  }

  handleSaved(value: string, id: string | undefined) {
    const newNote = { content: value, id_card: id, likes: 0, background: '' };
    this.dashboardService.postNotes(newNote).subscribe({
      next: (response) => {
        this.notes.push(response);
        // this.dashboardService.dataNotes.update((oldd) => {
          // return [...oldd, response];
        // });

        // console.log(this.notes);
      },
      error: (error) => {
        console.error('Erro ao adicionar nota:', error);
      },
    });
  }

  isActiveMore = (index: number) =>
    (this.isActive = this.isActive === index ? null : index);

  increaseLike = (noteId: string | undefined) =>
    this.dashFunctionsService.increaseOrDecreaseLike(this.notes, noteId, true);

  decreaseLike = (noteId: string | undefined) =>
    this.dashFunctionsService.increaseOrDecreaseLike(this.notes, noteId, false);

  focusNoteTextarea = () => this.publicBoardNotesComponent.focusNoteTextarea();

  isNoteChanges = (bool: boolean) => (this.value = bool);

  emitAddNoteClicked = () => (this.value = true);
}
