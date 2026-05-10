import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Navbar } from '../../../layout/navbar/navbar';

import { Sidebar } from '../../../layout/sidebar/sidebar';

import { TaskService } from '../../../core/services/task';

import { Task } from '../../../core/models/task';

import { TaskForm } from '../task-form/task-form';

import { ToastrService } from 'ngx-toastr';

import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Sidebar, TaskForm, DatePipe],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
})
export class TaskList implements OnInit {
  private taskService = inject(TaskService);

  private toastr = inject(ToastrService);

  tasks: Task[] = [];

  loading = false;

  selectedStatus = '';

  ngOnInit(): void {
    this.fetchTasks();
  }

  fetchTasks(): void {
    this.loading = true;

    this.taskService.getTasks(this.selectedStatus).subscribe({
      next: (response) => {
        this.tasks = response.tasks;

        this.loading = false;
      },

      error: (error) => {
        console.error(error);

        this.loading = false;
      },
    });
  }

  onDelete(id: string): void {
    const confirmed = confirm('Delete this task?');

    if (!confirmed) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.fetchTasks();
        this.toastr.success('Task deleted successfully');
      },

      error: (error) => {
        console.error(error);
        this.toastr.error(error.error?.message || 'Failed to delete task');
      },
    });
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return 'bg-green-100 text-green-700';

      case 'IN_PROGRESS':
        return 'bg-blue-100 text-blue-700';

      default:
        return 'bg-yellow-100 text-yellow-700';
    }
  }
}
