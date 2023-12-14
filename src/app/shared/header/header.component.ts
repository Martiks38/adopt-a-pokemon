import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { selectGetUserPokemons, selectQuantityPokemons } from '../state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  quantity$ = this.store.select(selectQuantityPokemons);
  user$ = this.store.select(selectGetUserPokemons);

  constructor(private store: Store) {}
}
