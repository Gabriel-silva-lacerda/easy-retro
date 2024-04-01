import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FilterInputComponent } from '../../components/filter-input/filter-input.component';
import { MatIconModule } from '@angular/material/icon';
import { CardComponent } from '../../components/card/card.component';
import { TextareaComponent } from '../../components/textarea/textarea.component';
import { DashboardService } from '../../service/dashboard.service';
import { PublicBoard } from '../../interfaces/dashBoard.interface';
import { ActivatedRoute } from '@angular/router';
import { PublicBoardModalComponent } from '../../shared/public-board-modal/public-board-modal.component';
import { IdService } from '../../service/id.service';
import { DashFunctionsService } from '../../service/dash-functions.service';

@Component({
  selector: 'app-publicboard',
  standalone: true,
  imports: [
    FilterInputComponent,
    MatIconModule,
    TextareaComponent,
    CardComponent,
    TextareaComponent,
  ],
  templateUrl: './publicboard.component.html',
  styleUrl: './publicboard.component.scss',
})
export class PublicboardComponent implements OnInit {
  dataBoard!: PublicBoard[];
  addNoteClicked!: boolean;
  notesId!: string | undefined;

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private idService: IdService,
    private dashFunctionsService: DashFunctionsService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idService.setId(id);
      this.dashboardService.getDataPublicboard().subscribe({
        next: (data) => {
          const filteredData = data.filter((board) => board.boardId === id);
          this.dashboardService.dataPublicboard.set(filteredData);
          this.dataBoard = filteredData;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }

    this.dashFunctionsService.deletePublic.subscribe((idPublicBoard) => {
      this.dataBoard = this.dataBoard.filter(
        (data) => data.id !== idPublicBoard
      );
    });
  }

  addNotesId = (id: string) => (this.notesId = id);
  openDialog = () => this.dialog.open(PublicBoardModalComponent);
}
