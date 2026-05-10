import { Component, EventEmitter, Input, OnInit, Output, inject } from '@angular/core';

import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { TaskService } from '../../../core/services/task';

import { UserService } from '../../../core/services/user';

import { AuthService } from '../../../core/services/auth';

import { Task } from '../../../core/models/task';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
})
export class TaskForm implements OnInit {
  private fb = inject(FormBuilder);

  private taskService = inject(TaskService);

  private userService = inject(UserService);

  private authService = inject(AuthService);

  private toastr = inject(ToastrService);

  @Input()
  task?: Task;

  @Output()
  taskCreated = new EventEmitter<void>();

  users: any[] = [];

  loading = false;

  showForm = false;

  currentUser = this.authService.getUser();

  taskForm = this.fb.group({
    title: ['', Validators.required],

    description: ['', Validators.required],

    status: ['PENDING'],

    assignedTo: [''],
  });

  ngOnInit(): void {
    this.loadAssignableUsers();

    // Edit Mode
    if (this.task) {
      this.showForm = false;

      this.taskForm.patchValue({
        title: this.task.title,

        description: this.task.description,

        status: this.task.status,

        assignedTo: this.task.assignedTo?._id,
      });
    }
  }

  loadAssignableUsers(): void {
    if (this.currentUser?.role === 'MANAGER') {
      this.userService.getUsers().subscribe({
        next: (response) => {
          this.users = response.users;
        },
      });
    }

    if (this.currentUser?.role === 'TEAM_LEAD') {
      this.userService.getTeamMembers().subscribe({
        next: (response) => {
          this.users = [this.currentUser, ...response.users];
        },
      });
    }
  }

  onSubmit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();

      return;
    }

    this.loading = true;

    // EDIT MODE
    if (this.task) {
      const taskId = this.task._id;

      this.taskService.updateTask(taskId, this.taskForm.value).subscribe({
        next: () => {
          // Assign separately
          if (this.taskForm.value.assignedTo) {
            this.taskService.assignTask(taskId, this.taskForm.value.assignedTo).subscribe();
          }

          this.loading = false;

          this.showForm = false;

          this.taskCreated.emit();

          this.toastr.success('Task updated successfully');
        },

        error: (error) => {
          console.error(error);

          this.loading = false;

          this.toastr.error(error.error?.message || 'Something went wrong');
        },
      });

      return;
    }

    // CREATE MODE
    this.taskService.createTask(this.taskForm.value).subscribe({
      next: () => {
        this.taskForm.reset({
          status: 'PENDING',
        });

        this.showForm = false;

        this.loading = false;

        this.taskCreated.emit();

        this.toastr.success('Task created successfully');
      },

      error: (error) => {
        console.error(error);

        this.loading = false;

        this.toastr.error(error.error?.message || 'Something went wrong');
      },
    });
  }
}
