import { Component, OnInit, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';

import { Navbar } from '../../../layout/navbar/navbar';

import { Sidebar } from '../../../layout/sidebar/sidebar';

import { UserService } from '../../../core/services/user';

import { AuthService } from '../../../core/services/auth';

import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Sidebar],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList implements OnInit {
  private userService = inject(UserService);

  private authService = inject(AuthService);

  private toastr = inject(ToastrService);

  users: any[] = [];

  teamLeads: any[] = [];

  loading = false;

  currentUser = this.authService.getUser();

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.loading = true;

    this.userService.getUsers().subscribe({
      next: (response) => {
        this.users = response.users;

        this.teamLeads = this.users.filter((user) => user.role === 'TEAM_LEAD');

        this.loading = false;
      },

      error: (error) => {
        console.error(error);

        this.loading = false;
      },
    });
  }

  assignEmployee(employeeId: string, teamLeadId: string): void {
    if (!teamLeadId) return;

    this.userService.assignEmployee(employeeId, teamLeadId).subscribe({
      next: () => {
        this.toastr.success('Employee assigned successfully');

        this.fetchUsers();
      },

      error: () => {
        this.toastr.error('Failed to assign employee');
      },
    });
  }

  getTeamLeadName(user: any): string {
    return user.teamLead?.username || 'Not Assigned';
  }
}
