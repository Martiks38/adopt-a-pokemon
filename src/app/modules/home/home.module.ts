import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ViewPokemonsComponent } from './components';

@NgModule({
  declarations: [HomeComponent],
  imports: [CommonModule, ViewPokemonsComponent],
})
export class HomeModule {}
