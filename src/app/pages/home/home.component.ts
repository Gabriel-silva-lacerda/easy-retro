import { DashFunctionsService } from './../../service/dash-functions.service';
import { Component, OnInit } from '@angular/core';
import { FilterInputComponent } from '../../components/filter-input/filter-input.component';
import { CardBoardComponent } from '../../components/card-board/card-board.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { BoardModalComponent } from '../../shared/board-modal/board-modal.component';
import { DashboardService } from '../../service/dashboard.service';
import { Board } from '../../interfaces/dashBoard.interface';
import { RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadingService } from '../../service/loading.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FilterInputComponent,
    CardBoardComponent,
    MatIconModule,
    MatButtonToggleModule,
    RouterOutlet,
    NgClass,
    MatProgressSpinnerModule,
    BoardModalComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  cardDash: Board[] = [];
  selectedButton: 'asc' | 'desc' = 'asc';
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private dashFunctionsService: DashFunctionsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDataBoards().subscribe(() => {
      this.cardDash = this.dashboardService.dataBoards();
      this.sortCardDash(this.selectedButton);
    });

    this.loadingService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  toggleButtonState() {
    const newOrder = this.selectedButton === 'asc' ? 'desc' : 'asc';
    if (newOrder !== this.selectedButton) {
      this.selectedButton = newOrder;
    }
  }

  searchData = (value: string) =>
    (this.cardDash = this.dashFunctionsService.filterData(
      this.dashboardService.searchBoard(),
      value,
      'projectName'
    ));

  sortCardDash(order: 'asc' | 'desc' = 'asc') {
    this.cardDash = this.dashFunctionsService.sortCardDash(
      this.cardDash,
      order
    );
    this.selectedButton = order;
  }

  openDialog = () => this.dialog.open(BoardModalComponent);
}
