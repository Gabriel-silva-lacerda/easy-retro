import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashboardService } from '../../service/dashboard.service';
import { Notes, PublicBoard } from '../../interfaces/dashBoard.interface';
import { DashFunctionsService } from '../../service/dash-functions.service';

@Component({
  selector: 'app-more-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './more-list.component.html',
  styleUrl: './more-list.component.scss',
})
export class MoreListComponent {
  @Input() data!: PublicBoard | Notes;
  @Input() isColorActive = false;
  @Input() desactiveMoreList = false;
  @Output() isColor = new EventEmitter();
  @Output() isActiveEdit = new EventEmitter();

  isActiveComponent = false;

  constructor(private dashFunctionsService: DashFunctionsService) {}

  editNote() {
    this.isActiveComponent = true;
    this.isActiveEdit.emit(this.isActiveComponent);
  }

  deleteNote = (id: string | undefined) => {
    // this.dashFunctionsService.deleteNotes(id);
    this.dashFunctionsService.deletePublicBoard2(id);
  };

  colorNote() {
    this.isColorActive = true;
    this.isColor.emit(this.isColorActive);
  }
}
