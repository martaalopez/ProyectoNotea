import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private currentThemeSubject = new BehaviorSubject<string>('light');
  currentTheme = this.currentThemeSubject.asObservable();

  setTheme(theme: string) {
    document.documentElement.setAttribute('data-theme', theme);
    this.currentThemeSubject.next(theme);
  }

  toggleTheme() {
    console.log('Toggle Theme Called');
    const currentTheme = this.currentThemeSubject.value;
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    console.log('New Theme:', newTheme);
    this.setTheme(newTheme);
  }
}
