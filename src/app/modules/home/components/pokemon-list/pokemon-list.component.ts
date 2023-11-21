import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from 'src/app/shared';
import { PokemonItemComponent } from '../pokemon-item';
import { Pokemon } from 'src/app/typings/pokemon';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, LoaderComponent, PokemonItemComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent {
  @Input() pokemons!: Pokemon[];
}
