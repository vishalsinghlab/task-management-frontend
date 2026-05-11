import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private darkMode: boolean = false;

  constructor() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme) {
      this.darkMode = savedTheme === 'dark';
    } else {
      this.darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    }

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
    document.documentElement.classList.toggle('dark', this.darkMode);
  }
}
