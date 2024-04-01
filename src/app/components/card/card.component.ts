import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TextareaComponent } from '../textarea/textarea.component';
import { DashboardService } from '../../service/dashboard.service';
import { Notes, PublicBoard } from '../../interfaces/dashBoard.interface';
import { DashFunctionsService } from '../../service/dash-functions.service';
import { MoreListComponent } from '../more-list/more-list.component';
import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';
import { FormsModule } from '@angular/forms';
import { Observable, forkJoin } from 'rxjs';
import { ColorPickerComponent } from '../color-picker/color-picker.component';
import { FilterService } from '../../service/filter.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [
    MatIconModule,
    TextareaComponent,
    MoreListComponent,
    NgStyle,
    NotesComponent,
    FormsModule,
    JsonPipe,
    ColorPickerComponent,
    NgClass,
    NgStyle,
  ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent implements OnInit, OnChanges {
  @ViewChild(TextareaComponent)
  publicBoardNotesComponent!: TextareaComponent;
  @Input() cardName!: PublicBoard;
  @Input() index!: number;
  @Input() valueFilterNotes!: string;
  @Input() layout: any;

  value = false;
  isActive: number | null | boolean = null;
  isActiveMoreList: number | null | boolean = null;
  isShowComponent = false;
  isColor = false;

  notes: Notes[] = [];
  filterNotes: Notes[] = [];

  constructor(
    private dashboardService: DashboardService,
    private dashFunctionsService: DashFunctionsService
  ) {}

  ngOnInit(): void {
    const obj = {
      cardId: this.cardName.id,
    };

    this.dashFunctionsService.deleteNote.subscribe((deletedNoteId) => {
      this.notes = this.notes.filter((note) => note.id !== deletedNoteId);
      // if (deletedNoteId) {
      //   this.dashboardService.getNotes(obj).subscribe((data) => {
      //     console.log(data);

      //     this.notes = data;
      //   });
      // }
    });

    this.dashboardService.getNotes(obj).subscribe((data) => {
      this.notes = data;
      this.filterNotes = data;
    });
  }

  ngOnChanges(): void {


    // this.notes = this.dashFunctionsService.filterData(
    //   this.filterNotes,
    //   this.valueFilterNotes,
    //   'content'
    // );
  }

  handleSaved(value: string, id: string | undefined) {
    const newNote = { content: value, cardId: id, likes: 0, background: '' };
    this.dashboardService.postNotes(newNote).subscribe({
      next: (response) => {
        this.notes.push(response);
        this.filterNotes = this.notes;
      },
      error: (error) => {
        console.error('Erro ao adicionar nota:', error);
      },
    });
  }

  showComponent(boll: boolean, status?: string) {
    status === 'edit' ? (this.isShowComponent = boll) : (this.isColor = boll);
    this.isActiveMoreList = false;
  }

  editBoardName() {
    this.isShowComponent = false;
    this.dashboardService.updatePublicBoard(this.cardName).subscribe({
      error: (error) => {
        console.error(error);
      },
    });
  }

  changeColor(background: string) {
    this.isColor = false;

    console.log(this.layout);

    const observables = this.notes.map((note) => {
      const updatedNote = { ...note, background };
      const observable = this.dashboardService.updateNote(updatedNote);

      return observable;
    });

    forkJoin(observables).subscribe({
      next: () => {
        this.notes.forEach((note) => {
          note.background = background;
        });
      },
      error: (error) => {
        console.error(error);
      },
    });
  }

  isActiveMore = (index: number) =>
    (this.isActiveMoreList = this.isActiveMoreList === index ? null : index);

  increaseLike = (noteId: string | undefined) =>
    this.dashFunctionsService.increaseOrDecreaseLike(this.notes, noteId, true);

  decreaseLike = (noteId: string | undefined) =>
    this.dashFunctionsService.increaseOrDecreaseLike(this.notes, noteId, false);

  focusNoteTextarea = () => this.publicBoardNotesComponent.focusNoteTextarea();

  isNoteChanges = (bool: boolean) => (this.value = bool);

  emitAddNoteClicked = () => (this.value = true);
}
