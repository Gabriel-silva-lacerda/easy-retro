import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { FilterInputComponent } from '../../components/filter-input/filter-input.component';
import { MatIconModule } from '@angular/material/icon';
import { PublicBoardNameComponent } from '../../components/public-board-name/public-board-name.component';
import { PublicBoardNotesComponent } from '../../components/public-board-notes/public-board-notes.component';
import { DashboardService } from '../../service/dashboard.service';
import { dashBoard, publicBoard } from '../../interfaces/dashBoard.interface';
import { ActivatedRoute } from '@angular/router';
import { PublicBoardModalComponent } from '../../shared/public-board-modal/public-board-modal.component';
import { forkJoin } from 'rxjs';
import { IdService } from '../../service/id.service';

@Component({
  selector: 'app-publicboard',
  standalone: true,
  imports: [
    FilterInputComponent,
    MatIconModule,
    PublicBoardNotesComponent,
    PublicBoardNameComponent,
    PublicBoardNotesComponent,
  ],
  templateUrl: './publicboard.component.html',
  styleUrl: './publicboard.component.scss',
})
export class PublicboardComponent implements OnInit {
  dataBoard!: publicBoard[];
  addNoteClicked!: boolean;
  notesId!: string | undefined;
  notes: any[] = [];

  constructor(
    private dashboardService: DashboardService,
    private route: ActivatedRoute,
    public dialog: MatDialog,
    private idService: IdService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.idService.setId(id);
      forkJoin({
        dataPublicboard: this.dashboardService.getDataPublicboard(),
        cardDetails: this.dashboardService.getDataPublicboardById(id),
      }).subscribe({
        next: ({ dataPublicboard, cardDetails }) => {
          const filteredData = dataPublicboard.filter(
            (board) => board.id_card === id
          );
          filteredData.push(...cardDetails);
          this.dashboardService.dataPublicboard.set(filteredData);
          this.dataBoard = filteredData;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }

    // const notesArray = this.dataBoard.map((data) => data.notes).flat();
    // this.notes = notesArray;
  }

  addNotesId = (id: string) => (this.notesId = id);
  openDialog = () => this.dialog.open(PublicBoardModalComponent);
}
