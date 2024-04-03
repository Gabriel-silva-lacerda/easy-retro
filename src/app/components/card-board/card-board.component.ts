import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Board } from '../../interfaces/dashBoard.interface';
import { DashFunctionsService } from '../../service/dash-functions.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../service/loading.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-card-board',
  standalone: true,
  imports: [MatIconModule, DatePipe, AsyncPipe, MatProgressSpinnerModule],
  templateUrl: './card-board.component.html',
  styleUrl: './card-board.component.scss',
})
export class CardBoardComponent implements OnInit {
  @Input() cardContent!: Board;

  isLoading = false;

  ngOnInit(): void {
    this.loadingService
      .isLoadingForId(this.cardContent.id as string)
      .subscribe((isLoading) => {
        this.isLoading = isLoading;
      });
  }

  constructor(
    private dashFunctionsService: DashFunctionsService,
    private router: Router,
    private loadingService: LoadingService
  ) {}

  deleteBoard = (id: string | any) => this.dashFunctionsService.deleteBoard(id);

  redirectToCard(cardId: string | undefined): void {
    this.router.navigate(['/publicboard', cardId]);
  }
}
