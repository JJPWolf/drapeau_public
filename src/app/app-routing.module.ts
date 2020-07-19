import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'jeu_difficile',
    loadChildren: () => import('./pages/jeu/jeu.module').then( m => m.JeuPageModule)
  },
  {
    path: 'jeu_normal',
    loadChildren: () => import('./pages/jeu/jeu.module').then( m => m.JeuPageModule)
  },
  {
    path: 'jeu_facile',
    loadChildren: () => import('./pages/jeu/jeu.module').then( m => m.JeuPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
