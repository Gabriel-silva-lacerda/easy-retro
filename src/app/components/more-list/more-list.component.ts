import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
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
  @Input() data!: PublicBoard | Notes | any;
  @Output() showColorComponent = new EventEmitter();
  @Output() showEditComponent = new EventEmitter();
  @Output() showDeleteComponent = new EventEmitter();

  isEditActive = false;
  isColorActive = false;
  isDeleteActive = false;

  constructor(private dashFunctionsService: DashFunctionsService) {}

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
