import { DashboardService } from './../../service/dashboard.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Notes, Card } from '../../interfaces/dashBoard.interface';
import { DashFunctionsService } from '../../service/dash-functions.service';

@Component({
  selector: 'app-more-list',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './more-list.component.html',
  styleUrl: './more-list.component.scss',
})
export class MoreListComponent {
  @Input() data!: Notes | Card | any;
  @Output() showColorComponent = new EventEmitter();
  @Output() showEditComponent = new EventEmitter();
  @Output() showDeleteComponent = new EventEmitter();

  isEditActive = false;
  isColorActive = false;
  isDeleteActive = false;

  @Input() showDeleteButton!: boolean;

  constructor(
    private dashFunctionsService: DashFunctionsService,
    private dashboardService: DashboardService
  ) {}

  editData() {
    this.isEditActive = true;
    this.showEditComponent.emit(this.isEditActive);
  }

  deleteData = (id: string | undefined, cardId?: string) => {
    if (id && cardId) this.dashFunctionsService.deleteNote(id, cardId);
    else this.dashFunctionsService.deleteCard(id);

    this.showDeleteComponent.emit(this.isDeleteActive);
  };

  colorPick() {
    this.isColorActive = true;
    this.showColorComponent.emit(this.isColorActive);
  }
}
