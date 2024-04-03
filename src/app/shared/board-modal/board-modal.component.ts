import { Component, OnInit } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DashboardService } from '../../service/dashboard.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { LoadingService } from '../../service/loading.service';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-board-modal',
  standalone: true,
  imports: [
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  templateUrl: './board-modal.component.html',
  styleUrl: './board-modal.component.scss',
})
export class BoardModalComponent implements OnInit {
  dashForm!: FormGroup;
  bothFieldsValid = false;
  id!: string | undefined;
  isLoading = false;

  constructor(
    private dialogRef: MatDialogRef<BoardModalComponent>,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dashForm = this.formBuilder.group({
      projectName: ['', [Validators.required]],
      taskName: ['', [Validators.required]],
    });
  }

  closeModal = () => this.dialogRef.close();

  onEnter = (event: Event) =>
    !this.dashForm.valid ? event.preventDefault() : null;

  onSubmit(): void {
    if (this.dashForm.valid) {
      this.isLoading = true;
      this.loadingService.setLoadingState(this.isLoading);
      document.body.style.overflow = 'hidden';

      const modalBoardValue = {
        projectName: this.dashForm.value.projectName,
        date: new Date(),
      };

      const modalPublicBoardValue = {
        taskName: this.dashForm.value.taskName,
        date: new Date(),
        boardId: '',
        notes: [],
      };

      this.dashboardService
        .postDataBoards(modalBoardValue)
        .pipe(
          switchMap((dataCards) => {
            modalPublicBoardValue.boardId = dataCards.id as string;
            return this.dashboardService.postDataCards(modalPublicBoardValue);
          })
        )
        .subscribe({
          next: () => {
            this.closeModal();

            document.body.style.overflow = 'initial';
            this.closeModal();
            this.isLoading = false;
            this.loadingService.setLoadingState(this.isLoading);

            if (!this.isLoading) {
              this.router.navigate([
                '/publicboard',
                modalPublicBoardValue.boardId,
              ]);
            }
          },
          error: (error) => {
            console.error(error);
            this.isLoading = false;
            this.loadingService.setLoadingState(false);
          },
        });
    }
  }
}
