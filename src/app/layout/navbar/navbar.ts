import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { AuthService } from '../../core/services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  private authService = inject(AuthService);

  user = this.authService.getUser();

  logout(): void {
    this.authService.logout();
  }
}
