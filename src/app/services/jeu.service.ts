import { Injectable } from '@angular/core';
import { HttpService } from '../services/http.service'
import { Pays } from '../models/pays.model';
import { Subject} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class JeuService {

    pays : Pays[]=[];
    paysSubject = new Subject<Pays>();
    paysEnCours : Pays;
    pays_deja_fais : Pays[] = [];

    nbTours : number = 1;
    nbToursSubject = new Subject<number>();


    emitPays(){
        this.paysSubject.next(this.paysEnCours);
      }

    emitnbTours(){
        this.nbToursSubject.next(this.nbTours);
    }



    flagDirectory = '/assets/img/flags/svg/';
    constructor(private httpService : HttpService) {}

    init_country(){
        this.pays=[];
        this.pays_deja_fais=[];
        this.nbTours=1;
        this.httpService.get_data().subscribe((data)=>{
            let result = [];
            for(let i in data){
                    const newPays : Pays = new Pays(data[i], i, (this.httpService.baseroute+this.flagDirectory+i.toLowerCase())+'.svg' );
                    this.pays.push(newPays);
            }
            //this.change_country();
            this.myLoop();
        });
    }


    myLoop() {
        this.emitnbTours();
        let self=this;
        //this.nbTours++;
        if(this.nbTours <= 20){
            this.nbTours++;
            this.change_country();
            //this.myLoop();                            
        }

    }

    change_country(){
        this.paysEnCours=this.random_country();
        this.emitPays();
    }

    imageExists(image_url){

        let http = new XMLHttpRequest();
    
        http.open('HEAD', image_url, false);
        http.send();
    
        return http.status != 404;
    }

    random_country(){
        let newPays;
        do{
            newPays=this.pays[this.getRandomIntInclusive(0,(this.pays.length)-1)];
        }while(this.pays_deja_fais.indexOf(newPays) != -1);
        //return this.pays[this.getRandomIntInclusive(0,(this.pays.length)-1)];
        this.pays_deja_fais.push(newPays);
        return newPays;
    }

    getRandomIntInclusive(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min +1)) + min;
    }

    verifReponse(reponse){
        reponse = (reponse.normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toUpperCase();
        let nomPays = ((this.paysEnCours.nom).normalize("NFD").replace(/[\u0300-\u036f]/g, "")).toUpperCase();
        return(reponse==nomPays);
        
    }





}
