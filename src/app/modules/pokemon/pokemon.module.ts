import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { PokemonRoutingModule } from './pokemon-router.module';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { ListFormPipe } from 'src/app/pipes/listForm.pipe';

@NgModule({
  declarations: [PokemonComponent, CapitalizePipe, ListFormPipe],
  imports: [CommonModule, PokemonRoutingModule],
})
export class PokemonModule {}
