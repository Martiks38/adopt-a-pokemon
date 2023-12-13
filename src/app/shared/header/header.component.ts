import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectQuantityPokemons } from '../state';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  quantity: number = 0;
  pokemonStore$: Observable<number> = new Observable();

  constructor(private store: Store) {
    this.pokemonStore$ = this.store.select(selectQuantityPokemons);
  }

  ngOnInit(): void {
    this.pokemonStore$.subscribe(
      (quantityOfPokemons) => (this.quantity = quantityOfPokemons)
    );
  }
}
