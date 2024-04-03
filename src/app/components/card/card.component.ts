import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TextareaComponent } from '../textarea/textarea.component';
import { DashboardService } from '../../service/dashboard.service';
import { Notes, Card } from '../../interfaces/dashBoard.interface';
import { DashFunctionsService } from '../../service/dash-functions.service';
import { MoreListComponent } from '../more-list/more-list.component';
import { JsonPipe, NgClass, NgStyle } from '@angular/common';
import { NotesComponent } from '../notes/notes.component';
import { FormsModule } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { ColorPickerComponent } from '../color-picker/color-picker.component';

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
export class CardComponent implements OnChanges {
  @ViewChild(TextareaComponent)
  publicBoardNotesComponent!: TextareaComponent;
  @Input() card!: Card;
  @Input() valueFilterNotes!: string;
  @Input() index!: number;
  @Input() layout!: 'flex' | 'block';

  value = false;
  isActive: number | null | boolean = null;
  isActiveMoreList: number | null | boolean = null;
  isShowComponent = false;
  isColor = false;
  originalNotes: Notes[] = [];

  constructor(
    private dashboardService: DashboardService,
    private dashFunctionsService: DashFunctionsService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['card'] && changes['card'].currentValue)
      this.originalNotes = [...this.card.notes];

    const card = this.dashboardService
      .searchNotes()
      .find((c) => c.id === this.card.id);

    if (
      changes['valueFilterNotes'] &&
      changes['valueFilterNotes'].currentValue
    ) {
      this.card.notes = this.dashFunctionsService.filterData(
        card?.notes || [],
        this.valueFilterNotes,
        'content'
      );
    } else this.card.notes = [...this.originalNotes];
  }

  generateNumericId(length: number) {
    let id = '';
    for (let i = 0; i < length; i++) {
      id += Math.floor(Math.random() * 10);
    }

    return id;
  }

  handleSaved(value: string, cardId: string | undefined) {
    const newNote = {
      id: this.generateNumericId(4),
      content: value,
      cardId,
      likes: 0,
      background: '',
    };

    this.card.notes.push(newNote);
    this.dashboardService.updateCard(this.card).subscribe({
      error: (error) => console.error(error),
    });
  }

  showComponent(boll: boolean, status?: string) {
    status === 'edit' ? (this.isShowComponent = boll) : (this.isColor = boll);
    this.isActiveMoreList = false;
  }

  editCardName() {
    this.isShowComponent = false;
    this.dashboardService.updateCard(this.card).subscribe({
      error: (error) => console.error(error),
    });
  }

  changeColor(background: string) {
    this.isColor = false;

    const observables = this.card.notes.map((note) => {
      note.background = background;
      const observable = this.dashboardService.updateCard(this.card);

      return observable;
    });

    forkJoin(observables).subscribe({
      next: () => {
        this.card.notes.forEach((note) => {
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

  focusNoteTextarea = () => this.publicBoardNotesComponent.focusNoteTextarea();

  isNoteChanges = (bool: boolean) => (this.value = bool);

  emitAddNoteClicked = () => (this.value = true);
}
