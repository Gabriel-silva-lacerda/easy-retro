import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';

@Component({
  selector: 'app-public-board-notes',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './public-board-notes.component.html',
  styleUrl: './public-board-notes.component.scss',
})
export class PublicBoardNotesComponent {
  @Input() isNoteActive!: boolean;
  @Input() boardNotes!: any;
  @Output() notesChanges = new EventEmitter<string>();
  @Output() isNoteChanges = new EventEmitter<boolean>();
  @Output() saveNoteClicked = new EventEmitter<string>();
  noteContent = '';

  closeNote() {
    this.isNoteActive = false;
    this.isNoteChanges.emit(this.isNoteActive);
  }

  saveNote() {
    this.saveNoteClicked.emit(this.noteContent);
    this.noteContent = '';
  }
}
