import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OMDbApiService {

/* fetch("https://www.omdbapi.com/?s=star%20wars&apikey=xxxxxxxx").then(resp => {
    if(resp.ok) {
        console.log(resp);
        resp.json().then(json => {
            console.log(json);
        })
    }
}).catch(err => {
    console.log(err);
}) */

  private baseURL: string = "https://www.omdbapi.com";

  constructor() { }
}
