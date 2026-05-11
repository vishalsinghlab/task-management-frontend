import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode = false;

  constructor() {
    const savedTheme = localStorage.getItem('theme');

    this.darkMode = savedTheme === 'dark';

    this.applyTheme();
  }

  toggleTheme(): void {
    this.darkMode = !this.darkMode;

    localStorage.setItem('theme', this.darkMode ? 'dark' : 'light');

    this.applyTheme();
  }

  isDarkMode(): boolean {
    return this.darkMode;
  }

  private applyTheme(): void {
    if (this.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
