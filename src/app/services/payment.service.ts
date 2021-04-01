import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://localhost:44363/api/';
  constructor(private httpClient: HttpClient) {}

  pay(rental:Rental,amount:number){
    let path = this.apiUrl + "rentals/paymentadd";
    //rental.returnDate = undefined;
    this.httpClient.post<ResponseModel>(path,{payment:{amount:amount},rental:rental})
  }
 
}
