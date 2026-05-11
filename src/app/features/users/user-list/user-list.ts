import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Navbar } from '../../../layout/navbar/navbar';

import { Sidebar } from '../../../layout/sidebar/sidebar';

import { UserService } from '../../../core/services/user';

import { AuthService } from '../../../core/services/auth';

import { ToastrService } from 'ngx-toastr';

import { LoadingSpinner } from '../../../shared/components/loading-spinner/loading-spinner';

import {
  LucideUsers,
  LucideUser,
  LucideBriefcase,
  LucideUserCog,
  LucideMail,
  LucideTag,
  LucideSettings,
} from '@lucide/angular';

@Component({
  selector: 'app-user-list',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    Navbar,
    Sidebar,
    LoadingSpinner,
    LucideUsers,
    LucideUser,
    LucideBriefcase,
    LucideUserCog,
    LucideMail,
    LucideTag,
    LucideSettings,
  ],

  templateUrl: './user-list.html',

  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  private userService = inject(UserService);

  private authService = inject(AuthService);

  private toastr = inject(ToastrService);

  private cdr = inject(ChangeDetectorRef);

  users: any[] = [];

  teamLeads: any[] = [];

  loading = false;

  currentUser = this.authService.getUser();

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;

    this.cdr.detectChanges();

    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.users;

        this.teamLeads = this.users.filter((user) => user.role === 'TEAM_LEAD');

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error(error);

        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }

  assignEmployee(employeeId: string, teamLeadId: string): void {
    if (!teamLeadId) return;

    this.loading = true;

    this.cdr.detectChanges();

    this.userService.assignEmployee(employeeId, teamLeadId).subscribe({
      next: () => {
        this.toastr.success('Employee assigned successfully');

        this.fetchUsers();

        this.loading = false;

        this.cdr.detectChanges();
      },

      error: () => {
        this.toastr.error('Failed to assign employee');

        this.loading = false;

        this.cdr.detectChanges();
      },
    });
  }

  getTeamLeadName(user: any): string {
    return user.teamLead?.username || 'Not Assigned';
  }

  getRoleClass(role: string): string {
    switch (role) {
      case 'MANAGER':
        return `
          bg-purple-100
          dark:bg-purple-900/30
          text-purple-700
          dark:text-purple-400
        `;

      case 'TEAM_LEAD':
        return `
          bg-blue-100
          dark:bg-blue-900/30
          text-blue-700
          dark:text-blue-400
        `;

      case 'EMPLOYEE':
        return `
          bg-green-100
          dark:bg-green-900/30
          text-green-700
          dark:text-green-400
        `;

      default:
        return `
          bg-gray-100
          dark:bg-gray-800
          text-gray-700
          dark:text-gray-400
        `;
    }
  }

  getRoleIcon(role: string): string {
    switch (role) {
      case 'MANAGER':
        return '👑';

      case 'TEAM_LEAD':
        return '👔';

      case 'EMPLOYEE':
        return '👤';

      default:
        return '🎭';
    }
  }
}
