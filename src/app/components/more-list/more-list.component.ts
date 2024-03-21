import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../service/dashboard.service';
import { Notes } from '../../interfaces/dashBoard.interface';
import { DashFunctionsService } from '../../service/dash-functions.service';

@Component({
  selector: 'app-more-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './more-list.component.html',
  styleUrl: './more-list.component.scss',
})
export class MoreListComponent {
  @Input() note!: Notes;
  @Input() isColorActive = false;
  @Input() desactiveMoreList = false;
  @Output() isColor = new EventEmitter();
  @Output() desactiveMore = new EventEmitter();
  @Output() isActiveEdit = new EventEmitter();
  isActiveTextArea = false;

  constructor(
    private dashboardService: DashboardService,
    private dashFunctionsService: DashFunctionsService
  ) {}

  editNote() {
    this.isActiveTextArea = true;
    this.isActiveEdit.emit(this.isActiveTextArea);
  }

  deleteNote = (id: string | undefined) =>
    this.dashFunctionsService.deleteNotes(id);

  colorNote(id: string | undefined) {
    this.isColorActive = true;
    this.isColor.emit(this.isColorActive);
    this.desactiveMore.emit(this.desactiveMoreList);
  }
}
