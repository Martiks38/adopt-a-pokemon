import { Component, Input } from '@angular/core';

import type { Pokemon } from 'src/app/typings/pokemon';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
  standalone: true,
})
export class PokemonItemComponent {
  @Input() pokemon!: Pokemon;

  isActive = false;

  addAnimation() {
    this.isActive = true;
  }
}
