import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';
import { Notes, Card } from '../../interfaces/dashBoard.interface';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-textarea',
  standalone: true,
  imports: [FormsModule, NgStyle],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss',
})
export class TextareaComponent {
  @Input() moreList = false;
  @Input() isNoteActive!: boolean;
  @Input() card!: Card;
  @Input() note!: Notes;
  @Input() noteContent = '';

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
      if (this.noteContent.trim() !== '') {
        this.note.content = this.noteContent;

        this.dashboardService.updateCard(this.card).subscribe({
          error: (error) => console.error(error),
        });
      }
    }
  }

  focusNoteTextarea() {
    const textarea = this.elementRef.nativeElement.querySelector('textarea');

    if (textarea) {
      textarea.focus();
    }
  }
}
