import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'login',
    loadChildren: () => import('./modules').then((m) => m.LoginModule),
  },
  {
    path: 'signup',
    loadChildren: () => import('./modules').then((m) => m.SignupModule),
  },
  {
    path: 'pokemon/:pokemon',
    loadChildren: () => import('./modules').then((m) => m.PokemonModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
