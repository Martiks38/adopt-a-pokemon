import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, LoginComponent } from './modules';
import { pokemonListGuardGuard } from './guards/pokemon-list-guard.guard';

const routes: Routes = [
  {
    path: 'pokemons',
    canActivate: [pokemonListGuardGuard],
    // Modificar según la ruta
    loadChildren: () => import('./modules').then((m) => m.SignupModule),
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
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
