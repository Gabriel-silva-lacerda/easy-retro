import { AsyncPipe, DatePipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { DashBoard } from '../../interfaces/dashBoard.interface';
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
  @Input() cardContent!: DashBoard;

  constructor(
    private dashFunctionsService: DashFunctionsService,
    private router: Router
  ) {}

  deleteBoard = (id: string | undefined) =>
    this.dashFunctionsService.deleteBoard(id);

  redirectToCard(cardId: string | undefined): void {
    this.router.navigate(['/publicboard', cardId]);
  }
}
