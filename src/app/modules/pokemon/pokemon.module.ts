import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon.component';
import { PokemonRoutingModule } from './pokemon-router.module';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { ListFormPipe } from 'src/app/pipes/listForm.pipe';
import { HeaderComponent } from 'src/app/shared';
import { MainContainerComponent } from 'src/app/shared/main-container';

@NgModule({
  declarations: [PokemonComponent, CapitalizePipe, ListFormPipe],
  imports: [
    CommonModule,
    PokemonRoutingModule,
    HeaderComponent,
    MainContainerComponent,
  ],
})
export class PokemonModule {}
