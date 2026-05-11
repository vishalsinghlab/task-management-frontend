import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../core/services/auth';
import {
  LucideMenu,
  LucideX,
  LucideLayoutDashboard,
  LucideCheckSquare,
  LucideUsers,
  LucideZap,
} from '@lucide/angular';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    LucideMenu,
    LucideX,
    LucideLayoutDashboard,
    LucideCheckSquare,
    LucideUsers,
    LucideZap,
  ],
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.css'],
})
export class Sidebar {
  user = new AuthService().getUser();
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
}
