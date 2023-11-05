import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import type { Pokemon } from 'src/app/typings/pokemon';

@Component({
  selector: 'app-pokemon-item',
  templateUrl: './pokemon-item.component.html',
  styleUrls: ['./pokemon-item.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class PokemonItemComponent {
  @Input() pokemon!: Pokemon;

  isActive = false;

  addAnimation() {
    this.isActive = true;
  }
}
