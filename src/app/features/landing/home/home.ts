import { ChangeDetectorRef, Component, inject, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import {
  LucideZap,
  LucideRocket,
  LucideLayoutDashboard,
  LucideUsers,
  LucideBarChart,
  LucideShield,
  LucideLogIn,
  LucideLogOut,
  LucideMenu,
} from '@lucide/angular';
import { AuthService } from '../../../core/services/auth';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    LucideZap,
    LucideRocket,
    LucideLayoutDashboard,
    LucideUsers,
    LucideBarChart,
    LucideShield,
    LucideLogIn,
    LucideLogOut,
    LucideMenu,
  ],
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private cdr = inject(ChangeDetectorRef);

  showUserMenu = false;
  mobileMenuOpen = false;
  isLoggedInStatus = false;
  currentUser: any = null;

  ngOnInit(): void {
    this.checkLoginStatus();

    // Listen to storage changes (if user logs in/out in another tab)
    window.addEventListener('storage', () => {
      this.checkLoginStatus();
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;

    // Close mobile menu when clicking outside
    if (this.mobileMenuOpen) {
      const isMobileButton = target.closest('[data-mobile-menu-button]');
      const isMobileMenu = target.closest('[data-mobile-menu]');

      if (!isMobileButton && !isMobileMenu) {
        this.mobileMenuOpen = false;
      }
    }

    // Close user menu when clicking outside
    if (this.showUserMenu) {
      const isUserButton = target.closest('[data-user-menu-button]');
      const isUserMenu = target.closest('[data-user-menu]');

      if (!isUserButton && !isUserMenu) {
        this.showUserMenu = false;
      }
    }
  }

  checkLoginStatus(): void {
    this.isLoggedInStatus = this.authService.isLoggedIn();
    this.currentUser = this.authService.getUser();
    this.cdr.detectChanges();

    console.log('Login Status Check:', {
      isLoggedIn: this.isLoggedInStatus,
      user: this.currentUser,
      token: localStorage.getItem('token'),
    });
  }

  isLoggedIn(): boolean {
    return this.isLoggedInStatus;
  }

  getUser() {
    return this.currentUser;
  }

  getUserInitials(): string {
    if (!this.currentUser?.username) return 'U';

    const names = this.currentUser.username.split(' ');
    if (names.length === 1) {
      return names[0].charAt(0).toUpperCase();
    }
    return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
  }

  toggleUserMenu(): void {
    this.showUserMenu = !this.showUserMenu;
  }

  logout(): void {
    this.authService.logout();
    this.checkLoginStatus();
  }
}
