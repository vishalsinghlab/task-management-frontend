import { Component, OnInit, OnDestroy, inject } from '@angular/core';

import { CommonModule, DatePipe, SlicePipe } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Subscription } from 'rxjs';

import { ToastrService } from 'ngx-toastr';

import { Navbar } from '../../../layout/navbar/navbar';
import { Sidebar } from '../../../layout/sidebar/sidebar';

import { TaskService } from '../../../core/services/task';
import { Task } from '../../../core/models/task';

import { TaskForm } from '../task-form/task-form';

import { SocketService } from '../../../core/services/socket';

import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

import { ChangeDetectorRef } from '@angular/core';

import {
  LucideCheckSquare,
  LucideFilter,
  LucideClipboardList,
  LucidePlus,
  LucideClock,
  LucideLoader2,
  LucideCheckCircle,
  LucideUser,
  LucideCalendar,
  LucideTrash2,
  LucidePencil,
} from '@lucide/angular';
@Component({
  selector: 'app-task-list',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Sidebar,
    TaskForm,
    DatePipe,
    SlicePipe,
    LoadingSpinner,
    LucideCheckSquare,
    LucideFilter,
    LucideClipboardList,
    LucidePlus,
    LucideClock,
    LucideLoader2,
    LucideCheckCircle,
    LucideUser,
    LucideCalendar,
    LucideTrash2,
    LucidePencil,
  ],

  templateUrl: './task-list.html',

  styleUrl: './task-list.css',
})
export class TaskList implements OnInit, OnDestroy {
  private taskService = inject(TaskService);

  private toastr = inject(ToastrService);

  private socketService = inject(SocketService);

  private cdr = inject(ChangeDetectorRef);

  tasks: Task[] = [];

  loading = false;

  selectedStatus = '';

  private socketSubscriptions: Subscription[] = [];

  private fetchSubscription?: Subscription;

  ngOnInit(): void {
    this.fetchTasks();

    this.setupSocketListeners();
  }

  ngOnDestroy(): void {
    this.socketSubscriptions.forEach((sub) => sub.unsubscribe());
    this.fetchSubscription?.unsubscribe();
  }

  private setupSocketListeners(): void {
    this.socketSubscriptions.push(
      this.socketService.listen('taskCreated').subscribe(() => {
        this.fetchTasks({ silent: true });
      }),
    );

    this.socketSubscriptions.push(
      this.socketService.listen('taskUpdated').subscribe(() => {
        this.fetchTasks({ silent: true });
      }),
    );

    this.socketSubscriptions.push(
      this.socketService.listen('taskDeleted').subscribe(() => {
        this.fetchTasks({ silent: true });
      }),
    );
  }

  fetchTasks(options?: { silent?: boolean }): void {
    const silent = options?.silent === true;

    console.log('BEFORE TRUE', this.loading);

    if (!silent) {
      this.loading = true;
      this.cdr.detectChanges();
    }

    console.log('AFTER TRUE', this.loading);

    this.taskService.getTasks(this.selectedStatus || undefined).subscribe({
      next: (response) => {
        console.log('API SUCCESS');

        this.tasks = response?.tasks || [];

        this.loading = false;

        this.cdr.detectChanges();

        console.log('AFTER FALSE', this.loading);
      },

      error: (error) => {
        console.log('API ERROR');

        this.loading = false;

        this.cdr.detectChanges();

        console.log('AFTER ERROR FALSE', this.loading);
      },
    });
  }

  onDelete(id: string): void {
    const confirmed = confirm('Are you sure you want to delete this task?');

    if (!confirmed) return;

    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.toastr.success('Task deleted successfully');

        this.fetchTasks();
      },

      error: (error) => {
        console.error('Delete error:', error);

        this.toastr.error(error?.error?.message || 'Failed to delete task');
      },
    });
  }

  // Update your onTaskCreated method
  onTaskCreated() {
    this.fetchTasks();
    // If this was called from modal, close it
    if (this.showEditModal) {
      this.closeEditModal();
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return `
          bg-yellow-100
          text-yellow-800
          dark:bg-yellow-900/30
          dark:text-yellow-300
        `;

      case 'IN_PROGRESS':
        return `
          bg-blue-100
          text-blue-800
          dark:bg-blue-900/30
          dark:text-blue-300
        `;

      case 'COMPLETED':
        return `
          bg-green-100
          text-green-800
          dark:bg-green-900/30
          dark:text-green-300
        `;

      default:
        return `
          bg-gray-100
          text-gray-800
          dark:bg-gray-800
          dark:text-gray-300
        `;
    }
  }

  getStatusIcon(status: string): string {
    switch (status) {
      case 'COMPLETED':
        return '✅';

      case 'IN_PROGRESS':
        return '🚀';

      case 'PENDING':
        return '⏳';

      default:
        return '📋';
    }
  }

  openCreateTaskForm(): void {
    const createButton = document.querySelector('app-task-form button') as HTMLButtonElement;

    if (createButton) {
      createButton.click();
    }
  }

  refreshTasks(): void {
    this.fetchTasks();

    this.toastr.info('Refreshing tasks...');
  }

  clearFilter(): void {
    this.selectedStatus = '';

    this.fetchTasks();
  }

  trackByTaskId(index: number, task: Task): string {
    return task._id;
  }

  // Add these properties to your component
  selectedTask: any = null;
  showEditModal = false;

  // Add these methods
  openEditModal(task: any) {
    this.selectedTask = task;
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedTask = null;
  }

  onTaskUpdated() {
    this.fetchTasks({ silent: false }); // Refresh the task list
    this.closeEditModal();
  }
}
