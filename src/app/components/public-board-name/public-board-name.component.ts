import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { PublicBoardNotesComponent } from '../public-board-notes/public-board-notes.component';
import { DashboardService } from '../../service/dashboard.service';
import { publicBoard } from '../../interfaces/dashBoard.interface';

@Component({
  selector: 'app-public-board-name',
  standalone: true,
  imports: [MatIconModule, PublicBoardNotesComponent],
  templateUrl: './public-board-name.component.html',
  styleUrl: './public-board-name.component.scss',
})
export class PublicBoardNameComponent implements OnInit {
  @Input() id!: string | undefined;
  @Input() selectedId!: string | undefined;
  @Input() board!: publicBoard;
  @Output() noteId = new EventEmitter<string>();
  value = false;
  notes!: any;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    const content = this.board.notes;
    this.notes = content;
  }

  handleSaved(value: string, id: string | undefined) {
    const content = this.board.notes;
    content.push({ content: value });

    const currentData = this.dashboardService.dataPublicboard();
    const newData = currentData.map((item) => {
      console.log({ notes: content });

      if (item.id === id) return { ...item, notes: content };

      return item;
    });

    this.dashboardService.dataPublicboard.set(newData);
    console.log(this.dashboardService.dataPublicboard());
  }

  isNoteChanges = (bool: boolean) => (this.value = bool);

  emitAddNoteClicked() {
    this.value = true;
    this.noteId.emit(this.board.id);
  }
}
