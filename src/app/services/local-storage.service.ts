import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  add(key:string,value:string){
    let valueToString=value.toString();
    localStorage.setItem(key,valueToString);
  }

  delete(key:string){
    localStorage.removeItem(key);
  }

  get(key:string){
    return localStorage.getItem(key);
  }
}
