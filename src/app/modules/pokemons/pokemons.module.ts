import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons.component';
import { HeaderComponent } from 'src/app/shared';
import { MainContainerComponent } from 'src/app/shared/main-container';
import { PokemonsRoutingModule } from './pokemons-router.module';

@NgModule({
  declarations: [PokemonsComponent],
  imports: [
    CommonModule,
    HeaderComponent,
    MainContainerComponent,
    PokemonsRoutingModule,
  ],
})
export class PokemonsModule {}
