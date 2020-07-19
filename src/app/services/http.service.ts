import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

    baseroute = window.location.origin;

    constructor(private http : HttpClient) { 
    }

    get_data(){
        return this.http.get(this.baseroute+'/assets/json/country.json');
    }

    check_if_file_exist(url){
        this.http.get(url).subscribe((data)=>{
            return 1;
        },error=>{
            return 0;
        })
        return false;
    }




}
