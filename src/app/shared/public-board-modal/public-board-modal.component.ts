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
import { IdService } from '../../service/id.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-public-board-modal',
  standalone: true,
  imports: [
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './public-board-modal.component.html',
  styleUrl: './public-board-modal.component.scss',
})
export class PublicBoardModalComponent implements OnInit {
  publicBoard!: FormGroup;
  id!: string | null;
  isLoading = false;

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
        boardId: this.id,
        notes: [],
      };
      this.isLoading = true;

      this.dashBoardService.postDataCards(modalValue).subscribe({
        next: () => {
          this.closeModal();
          this.isLoading = false;
        },
        error: (error) => {
          console.error(error);
        },
      });
    }
  }
}
