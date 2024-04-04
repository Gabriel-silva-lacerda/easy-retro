import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FilterInputComponent } from '../../components/filter-input/filter-input.component';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../components/card/card.component';
import { TextareaComponent } from '../../components/textarea/textarea.component';
import { DashboardService } from '../../service/dashboard.service';
import { Card, Notes } from '../../interfaces/dashBoard.interface';
import { ActivatedRoute } from '@angular/router';
import { PublicBoardModalComponent } from '../../shared/public-board-modal/public-board-modal.component';
import { IdService } from '../../service/id.service';
import { NgClass } from '@angular/common';
import { SpinnerComponent } from '../../components/spinner/spinner.component';

@Component({
  selector: 'app-publicboard',
  standalone: true,
  imports: [
    FilterInputComponent,
    MatIconModule,
    TextareaComponent,
    CardComponent,
    TextareaComponent,
    NgClass,
    SpinnerComponent,
  ],
  templateUrl: './publicboard.component.html',
  styleUrl: './publicboard.component.scss',
})
export class PublicboardComponent implements OnInit {
  cards: Card[] = [];

  addNoteClicked!: boolean;
  notesId!: string | undefined;
  valueFilterNotes = '';
  showData: boolean = false;
  displayType: 'flex' | 'block' = 'flex';

  isLoading = false;
  filterNotes: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private idService: IdService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idService.setId(id);
      this.isLoading = true;
      this.dashboardService.getDataCards().subscribe({
        next: (data) => {
          const filteredData = data.filter((board) => board.boardId === id);

          this.dashboardService.dataCards.set(filteredData);
          this.dashboardService.searchNotes.set(filteredData);

          this.cards = filteredData;
          this.filterNotes = filteredData;
        },
        error: (error) => {
          console.error(error);
        },
        complete: () => (this.isLoading = false),
      });
    }
  }

  toggleDisplay = (type: 'flex' | 'block') => (this.displayType = type);

  searchData = (value: string) => {
    this.valueFilterNotes = value;
  };

  addNotesId = (id: string) => (this.notesId = id);

  openDialog = () => this.dialog.open(PublicBoardModalComponent);
}
