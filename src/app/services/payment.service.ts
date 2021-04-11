import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { Rental } from '../models/rental';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private apiUrl = 'https://localhost:44363/api/';
  constructor(private httpClient: HttpClient) {}

  saveCard(card: CreditCard): Observable<ResponseModel> {
    let newUrl = this.apiUrl + 'creditcards/add';
    return this.httpClient.post<ListResponseModel<CreditCard>>(newUrl, card);
  }

  getCardByUserId(userId: number): Observable<ListResponseModel<CreditCard>> {
    
    let newUrl = this.apiUrl + 'creditcards/getbyid?id=' + userId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newUrl);
  }
  getCardByCardNumber(cardNumber:string){

    let newUrl = this.apiUrl + 'creditcards/getbycardnumber?cardNumber=' + cardNumber;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newUrl);

  }

  checkCardExist(cardNumber: string): Observable<SingleResponseModel<CreditCard>> {

    let newUrl = this.apiUrl + 'creditcards/getbycardnumber?cardNumber=' + cardNumber;
    return this.httpClient.get<SingleResponseModel<CreditCard>>(newUrl);
  }

  // // CheckFindexPoint(card:number): Observable<ListResponseModel<FindexPoint>> {
  // //   let newUrl = this.apiUrl + 'findexpoint/check/' + card;
  // //   return this.httpClient.get<DataResponseModel<FindexPoint>>(newUrl);
  // // }
 
}
