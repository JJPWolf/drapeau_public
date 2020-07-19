import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JeuPage } from './jeu.page';

const routes: Routes = [
  {
    path: '',
    component: JeuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JeuPageRoutingModule {}
