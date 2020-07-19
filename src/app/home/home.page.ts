import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  logo_src = '/assets/img/logo.png';
  image;
  constructor(private router : Router) {}

  onCommencerDifficile(){
    this.router.navigate(['jeu_difficile']);
  }
  onCommencerNormal(){
    this.router.navigate(['jeu_normal']);
  }
  onCommencerFacile(){
    this.router.navigate(['jeu_facile']);
  }

}
