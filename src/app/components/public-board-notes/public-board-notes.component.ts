import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';
import { Notes } from '../../interfaces/dashBoard.interface';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-public-board-notes',
  standalone: true,
  imports: [FormsModule, NgStyle],
  templateUrl: './public-board-notes.component.html',
  styleUrl: './public-board-notes.component.scss',
})
export class PublicBoardNotesComponent {
  @Input() moreList = false;
  @Input() isNoteActive!: boolean;
  @Input() noteContent = '';
  @Input() note!: Notes;

  @Output() notesChanges = new EventEmitter<string>();
  @Output() isNoteChanges = new EventEmitter<boolean>();
  @Output() saveNoteClicked = new EventEmitter<string>();
  @Output() focusTextarea = new EventEmitter<any>();

  constructor(
    private elementRef: ElementRef,
    private dashboardService: DashboardService
  ) {}

  ngOnInit(): void {
    this.focusTextarea.emit(this.focusNoteTextarea());
  }

  closeNote() {
    this.isNoteActive = false;
    this.isNoteChanges.emit(this.isNoteActive);
  }

  saveNote() {
    this.isNoteActive = false;
    this.isNoteChanges.emit(this.isNoteActive);
    this.saveNoteClicked.emit(this.noteContent);

    if (this.moreList) {
      console.log(this.moreList);

      this.note.content = this.noteContent;

      this.dashboardService.updateNote(this.note).subscribe({
        error: (error) => {
          console.error('Erro ao atualizar likes:', error);
        },
      });
    }
  }

  focusNoteTextarea() {
    const textarea = this.elementRef.nativeElement.querySelector('textarea');

    if (textarea) {
      textarea.focus();
    }
  }
}
