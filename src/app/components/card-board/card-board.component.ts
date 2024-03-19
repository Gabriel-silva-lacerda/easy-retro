import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { pipe } from 'rxjs';
import { dashBoard } from '../../interfaces/dashBoard.interface';
import { DashboardService } from '../../service/dashboard.service';
import { DashFunctionsService } from '../../service/dash-functions.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card-board',
  standalone: true,
  imports: [MatIconModule, DatePipe, AsyncPipe],
  templateUrl: './card-board.component.html',
  styleUrl: './card-board.component.scss',
})
export class CardBoardComponent {
  @Input() cardContent!: dashBoard;

  constructor(
    private dashFunctionsService: DashFunctionsService,
    private router: Router
  ) {}

  deleteCard = (id: string | undefined) =>
    this.dashFunctionsService.deleteCard(id);

  redirectToCard(cardId: string | undefined): void {
    this.router.navigate(['/publicboard', cardId]);
  }
}
