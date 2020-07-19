import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { JeuPageRoutingModule } from './jeu-routing.module';

import { JeuPage } from './jeu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    JeuPageRoutingModule
  ],
  declarations: [JeuPage]
})
export class JeuPageModule {}
