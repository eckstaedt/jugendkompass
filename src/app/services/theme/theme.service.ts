import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private readonly THEME_KEY = 'theme';

  constructor(private storage: StorageService, private plt: Platform) {}

  public static isThemeDark(): boolean {
    if (document.body.classList.value === 'dark') {
      return true;
    } else {
      return false;
    }
  }

  public async getThemeInStorage(): Promise<any> {
    return await this.storage.get('theme').then((theme: string) => {
      if (theme) {
        return theme;
      } else {
        return 'default';
      }
    });
  }

  public themeChange(theme): boolean {
    this.saveTheme(theme);
    return this.setTheme(theme);
  }

  public setAppTheme() {
    this.storage.get(this.THEME_KEY).then((theme: string) => {
      if (theme) {
        this.setTheme(theme);
      } else {
        this.setDefaultTheme();
      }
    });
  }

  private saveTheme(theme) {
    this.storage.set(this.THEME_KEY, theme);
  }

  private setTheme(theme): boolean {
    if (theme === 'default') {
      return this.setDefaultTheme();
    } else if (theme === 'light') {
      return this.toggleDarkTheme(false);
    } else if (theme === 'dark') {
      return this.toggleDarkTheme(true);
    } else {
      return this.setDefaultTheme();
    }
  }

  private toggleDarkTheme(isDark): boolean {
    document.body.classList.toggle('dark', isDark);
    return isDark;
  }

  private setDefaultTheme(): boolean {
    if (
      this.plt.platforms() &&
      this.plt.platforms().find(x => x === 'android') &&
      !this.plt.platforms().find(x => x === 'pwa')
    ) {
      const isDark = window.navigator.userAgent.includes('AndroidDarkMode');
      return this.toggleDarkTheme(isDark);
    } else {
      const prefersColor = window.matchMedia('(prefers-color-scheme: dark)');
      return this.toggleDarkTheme(prefersColor.matches);
    }
  }
}
