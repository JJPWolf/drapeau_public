import { Component, OnInit } from '@angular/core';
import { JeuService } from 'src/app/services/jeu.service';
import { Pays } from 'src/app/models/pays.model';
import { Subscription, interval, Observable } from 'rxjs';
import { IonItem } from '@ionic/angular';
@Component({
  selector: 'app-jeu',
  templateUrl: './jeu.page.html',
  styleUrls: ['./jeu.page.scss'],
})
export class JeuPage implements OnInit {

  pays : Pays;
  paysSub : Subscription;
  score : number=0;

  nbTours : number;
  nbToursSub : Subscription;

  timer;

  secondes : number;

  interval;

  constructor(private jeuService : JeuService) { }


  ngOnInit() {
    
    console.log(window.location.pathname);
    this.pays = new Pays("nom","sigle","drapeau");
    this.jeuService.init_country();
    this.paysSub = this.jeuService.paysSubject.subscribe(
      (pays:Pays)=>{
        this.pays=pays;
        this.initJeu();
      }
    );

    this.nbToursSub = this.jeuService.nbToursSubject.subscribe(
      (nbTours : number)=>{
        this.nbTours=nbTours;
      }
      
    )
    this.timer_jeu();
    
  }

  initJeu(){
    switch(window.location.pathname){
      case "/jeu_facile" :
      (<HTMLButtonElement>document.getElementById('btn_valider')).hidden = true;
      (<HTMLInputElement>document.getElementById('id_input')).hidden = true;
      (<HTMLButtonElement>document.getElementById('button1')).hidden = false;
      (<HTMLButtonElement>document.getElementById('button2')).hidden = false;
      this.initButtonsFacile();
      break;
      case "/jeu_normal":
      (<HTMLButtonElement>document.getElementById('btn_valider')).hidden = true;
      (<HTMLInputElement>document.getElementById('id_input')).hidden = true;
      (<HTMLButtonElement>document.getElementById('button1')).hidden = false;
      (<HTMLButtonElement>document.getElementById('button2')).hidden = false;
      (<HTMLButtonElement>document.getElementById('button3')).hidden = false;
      (<HTMLButtonElement>document.getElementById('button4')).hidden = false;
      this.initButtonsNormal();
      break;

    }
  }
  onValiderReponse(reponse : string){
    console.log(reponse);
    clearInterval(this.interval);
    clearTimeout(this.timer);
    
    switch(window.location.pathname){
      case "/jeu_facile" :
      this.reponseFacile(reponse);
      break;
      case "/jeu_normal":
      this.reponseNormale(reponse);
      break;
      case "/jeu_difficile":
      this.reponseDifficile(reponse);
      break;
    } 

  }

  onValiderInput(){
    let reponse = (<HTMLInputElement>document.getElementById('id_input')).value;
    this.onValiderReponse(reponse);
  }
  
  timer_jeu(){
    this.secondes=10;
    clearInterval(this.interval);
    let self =this;
    this.interval = setInterval(function(){self.secondes--;}, 1000);
    console.log(this.interval);
    this.timer = setTimeout(()=>{
      document.getElementById("btn_valider").click();
 }, 10000);
  }

  ionViewWillLeave() {
    clearInterval(this.interval);
    clearTimeout(this.timer);
} 

onValiderButton(event){
  this.onValiderReponse(event.srcElement.innerHTML);
}

getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

initButtonsFacile(){
  let tabNom = [];
  tabNom.push((this.jeuService.random_country()).nom);
  tabNom.push(this.pays.nom);
  let rand = this.getRandomInt(2);
  (<HTMLButtonElement>document.getElementById('button1')).innerHTML = tabNom[rand];
  tabNom.splice(rand,1);
  (<HTMLButtonElement>document.getElementById('button2')).innerHTML = tabNom[0];
}

initButtonsNormal(){
  let tabNom = [];
  tabNom.push((this.jeuService.random_country()).nom);
  tabNom.push((this.jeuService.random_country()).nom);
  tabNom.push((this.jeuService.random_country()).nom);
  tabNom.push(this.pays.nom);
  let tabNomEstUtilise : boolean[] = [false, false];

  let rand = this.getRandomInt(tabNom.length);
  (<HTMLButtonElement>document.getElementById('button1')).innerHTML = tabNom[rand];
  tabNom.splice(rand,1);
  rand = this.getRandomInt(tabNom.length);
  (<HTMLButtonElement>document.getElementById('button2')).innerHTML = tabNom[rand];
  tabNom.splice(rand,1);
  rand = this.getRandomInt(tabNom.length);
  (<HTMLButtonElement>document.getElementById('button3')).innerHTML = tabNom[rand];
  tabNom.splice(rand,1);
  rand = this.getRandomInt(tabNom.length);
  (<HTMLButtonElement>document.getElementById('button4')).innerHTML = tabNom[rand];
}

reponseDifficile(reponse : string){
  if(this.jeuService.verifReponse(reponse)){
    this.score+=500;
    if(this.nbTours<20){
      this.jeuService.myLoop();
      this.timer_jeu();
      (<HTMLInputElement>document.getElementById('id_input')).value="";
    }else{
      (<HTMLButtonElement>document.getElementById('btn_valider')).disabled = true; 
      (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "Jeu terminé ";
    }

  }else{
    let self = this;
    console.log("La réponse était : "+this.pays.nom);
    (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "La réponse était : "+this.pays.nom;
    if(this.nbTours<20){
      (<HTMLButtonElement>document.getElementById('btn_valider')).disabled = true; 
      setTimeout(function() {       
        (<HTMLButtonElement>document.getElementById('btn_valider')).disabled = false; 
        self.jeuService.myLoop();
        self.timer_jeu();
        (<HTMLInputElement>document.getElementById('id_input')).value="";
        (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "";                        
      }, 1500)
    }else{
      (<HTMLButtonElement>document.getElementById('btn_valider')).disabled = true; 
      setTimeout(function() {     
        (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "Jeu terminé ";         
      }, 1000)
    }

  }
}

reponseNormale(reponse : string){
  if(this.jeuService.verifReponse(reponse)){
    this.score+=500;
    if(this.nbTours<20){
      this.jeuService.myLoop();
      this.jeuService.change_country();
      this.initButtonsNormal();
      this.timer_jeu();
    }else{
      
      (<HTMLButtonElement>document.getElementById('button1')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button2')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button3')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button4')).disabled=true;
      (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "Jeu terminé ";
    }
  }else{
    let self = this;
    console.log("La réponse était : "+this.pays.nom);
    (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "La réponse était : "+this.pays.nom;
    if(this.nbTours<20){
      (<HTMLButtonElement>document.getElementById('button1')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button2')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button3')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button4')).disabled=true;
      setTimeout(function() {       
        (<HTMLButtonElement>document.getElementById('button1')).disabled=false;
        (<HTMLButtonElement>document.getElementById('button2')).disabled=false;
        (<HTMLButtonElement>document.getElementById('button3')).disabled=false;
        (<HTMLButtonElement>document.getElementById('button4')).disabled=false;
        self.jeuService.myLoop();
        self.jeuService.change_country();
        self.initButtonsNormal();
        self.timer_jeu();
        //(<HTMLInputElement>document.getElementById('id_input')).value="";
        (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "";                        
      }, 1500)
    }else{
      (<HTMLButtonElement>document.getElementById('button1')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button2')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button3')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button4')).disabled=true;
      setTimeout(function() {     
        (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "Jeu terminé ";         
      }, 1000)
    }

  }
}

reponseFacile(reponse : string){
  if(this.jeuService.verifReponse(reponse)){
    this.score+=500;
    if(this.nbTours<20){
      this.jeuService.myLoop();
      this.jeuService.change_country();
      this.initButtonsFacile();
      this.timer_jeu();
    }else{
      
      (<HTMLButtonElement>document.getElementById('button1')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button2')).disabled=true;
      (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "Jeu terminé ";
    }
  }else{
    let self = this;
    console.log("La réponse était : "+this.pays.nom);
    (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "La réponse était : "+this.pays.nom;
    if(this.nbTours<20){
      (<HTMLButtonElement>document.getElementById('button1')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button2')).disabled=true;
      setTimeout(function() {       
        (<HTMLButtonElement>document.getElementById('button1')).disabled=false;
        (<HTMLButtonElement>document.getElementById('button2')).disabled=false;
        self.jeuService.myLoop();
        self.jeuService.change_country();
        self.initButtonsFacile();
        self.timer_jeu();
        //(<HTMLInputElement>document.getElementById('id_input')).value="";
        (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "";                        
      }, 1500)
    }else{
      (<HTMLButtonElement>document.getElementById('button1')).disabled=true;
      (<HTMLButtonElement>document.getElementById('button2')).disabled=true;
      setTimeout(function() {     
        (<HTMLLabelElement>document.getElementById('id_label_reponse')).innerHTML = "Jeu terminé ";         
      }, 1000)
    }

  }
}


}
