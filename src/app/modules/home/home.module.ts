import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { ViewPokemonsComponent } from './components';
import { HeaderComponent } from 'src/app/shared';
import { MainContainerComponent } from 'src/app/shared/main-container';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ViewPokemonsComponent,
    HeaderComponent,
    MainContainerComponent,
  ],
})
export class HomeModule {}
