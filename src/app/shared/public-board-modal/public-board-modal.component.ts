import { RouterOutlet } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { IdService } from '../../service/id.service';
import { publicBoard } from '../../interfaces/dashBoard.interface';
@Component({
  selector: 'app-public-board-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  templateUrl: './public-board-modal.component.html',
  styleUrl: './public-board-modal.component.scss',
})
export class PublicBoardModalComponent implements OnInit {
  publicBoard!: FormGroup;
  id!: string | null;
  constructor(
    private formBuilder: FormBuilder,
    private dashBoardService: DashboardService,
    private dialogRef: MatDialogRef<PublicBoardModalComponent>,
    private idService: IdService
  ) {}

  ngOnInit(): void {
    this.publicBoard = this.formBuilder.group({
      taskName: ['', [Validators.required]],
    });

    this.idService.id$.subscribe((id) => {
      this.id = id;
    });
  }

  closeModal = () => this.dialogRef.close();

  onSubmit() {
    if (this.id !== null) {
      const modalValue = {
        taskName: this.publicBoard.value.taskName,
        date: new Date(),
        id_card: this.id,
        notes: [] as { content: string }[],
      };

      this.dashBoardService.postDataPublicboard(modalValue).subscribe({
        next: () => {
          this.closeModal();
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
