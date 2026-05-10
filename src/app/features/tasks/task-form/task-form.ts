import { Component, EventEmitter, Output, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm {
  private fb = inject(FormBuilder);

  private taskService = inject(TaskService);

  @Output()
  taskCreated = new EventEmitter<void>();

  showForm = false;

  loading = false;

  taskForm = this.fb.group({
    title: ['', Validators.required],

    description: ['', Validators.required],

    status: ['PENDING'],
  });

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.taskForm.reset({
          status: 'PENDING',
        });

        this.showForm = false;

        this.loading = false;

        this.taskCreated.emit();
      },

      error: (error) => {
        console.error(error);

        this.loading = false;
      },
    });
  }
}
