import { Component, OnInit } from '@angular/core';

const themeStorage = 'page-theme';
const dark = 'dark';
const light = 'light';
const lightClass = 'light';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.scss'],
  standalone: true,
})
export class ChangeThemeComponent implements OnInit {
  changeTo: string = 'Switch to light mode';
  turn: number = 0;
  body: HTMLElement = document.body;
  mode: string = '';

  get turnStyle(): string {
    return `transform: rotate(${this.turn * 0.5}turn)`;
  }

  ngOnInit(): void {
    const theme = window.localStorage.getItem(themeStorage);

    if (!theme) {
      window.localStorage.setItem(themeStorage, dark);
    }

    if (theme === light) {
      this.body.classList.add(lightClass);
      this.turn += 1;
    }
  }

  changeTheme() {
    this.turn += 1;
    this.body.classList.toggle(lightClass);

    const theme = this.turn % 2 === 0 ? dark : light;

    window.localStorage.setItem(themeStorage, theme);
  }
}
