import { Component, OnInit, inject } from '@angular/core';

import { Navbar } from '../../../layout/navbar/navbar';

import { Sidebar } from '../../../layout/sidebar/sidebar';

import { TaskService } from '../../../core/services/task';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [Navbar, Sidebar],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private taskService = inject(TaskService);

  totalTasks = 0;

  completedTasks = 0;

  pendingTasks = 0;

  inProgressTasks = 0;

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.taskService.getTasks().subscribe({
      next: (response) => {
        const tasks = response.tasks;

        this.totalTasks = tasks.length;

        this.completedTasks = tasks.filter((task: any) => task.status === 'COMPLETED').length;

        this.pendingTasks = tasks.filter((task: any) => task.status === 'PENDING').length;

        this.inProgressTasks = tasks.filter((task: any) => task.status === 'IN_PROGRESS').length;
      },
    });
  }
}
