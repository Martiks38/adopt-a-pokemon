import { Component } from '@angular/core';

@Component({
  selector: 'app-change-theme',
  templateUrl: './change-theme.component.html',
  styleUrls: ['./change-theme.component.scss'],
  standalone: true,
})
export class ChangeThemeComponent {
  changeTo: string = 'Switch to light mode';
  turn: number = 0;
  body: HTMLElement = document.body;

  get turnStyle(): string {
    return `transform: rotate(${this.turn * 0.5}turn)`;
  }

  changeTheme() {
    this.turn += 1;

    this.body.classList.toggle('light');
  }
}
