import { DashFunctionsService } from './../../service/dash-functions.service';
import { Component, OnInit } from '@angular/core';
import { FilterInputComponent } from '../../components/filter-input/filter-input.component';
import { CardBoardComponent } from '../../components/card-board/card-board.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { BoardModalComponent } from '../../shared/board-modal/board-modal.component';
import { DashboardService } from '../../service/dashboard.service';
import { DashBoard } from '../../interfaces/dashBoard.interface';
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
  cardDash: DashBoard[] = [];
  selectedButton: 'asc' | 'desc' = 'asc';
  isLoading = false;

  constructor(
    public dialog: MatDialog,
    private dashboardService: DashboardService,
    private dashFunctionsService: DashFunctionsService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getDataDashboard().subscribe(() => {
      this.cardDash = this.dashboardService.dataDash();
      this.sortCardDash(this.selectedButton);
    });

    this.loadingService.isLoading$.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
  }

  openDialog = () => this.dialog.open(BoardModalComponent);

  toggleButtonState() {
    const newOrder = this.selectedButton === 'asc' ? 'desc' : 'asc';
    if (newOrder !== this.selectedButton) {
      this.selectedButton = newOrder;
    }
  }

  searchData(value: string) {
    this.cardDash = this.dashboardService.searchDash().filter((cardValue) => {
      return cardValue.projectName.toLowerCase().includes(value);
    });
  }

  sortCardDash(order: 'asc' | 'desc' = 'asc') {
    this.cardDash = this.dashFunctionsService.sortCardDash(
      this.cardDash,
      order
    );
    this.selectedButton = order;
  }
}
