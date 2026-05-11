import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/services/auth';

import { ThemeService } from '../../core/services/theme';

import {
  LucideZap,
  LucideUser,
  LucideSun,
  LucideMoon,
  LucideSunMoon,
  LucideLogOut,
} from '@lucide/angular';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    RouterLink,
    CommonModule,
    LucideZap,
    LucideUser,
    LucideSun,
    LucideMoon,
    LucideSunMoon,
    LucideLogOut,
  ],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);

  private themeService = inject(ThemeService);

  user = this.authService.getUser();

  logout(): void {
    this.authService.logout();
  }

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

  isDarkMode(): boolean {
    return this.themeService.isDarkMode();
  }
}
