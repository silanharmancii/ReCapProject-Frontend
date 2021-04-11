import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreditCard } from '../models/creditCard';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {

  constructor(private httpClient: HttpClient) { }

  apiUrl = 'https://localhost:44363/api/'

  // isCardExist(card:CreditCard):Observable<ResponseModel>{
  //   let newPath = this.apiUrl + "creditcards/iscardexist";
  //   console.log(card);
  //   return this.httpClient.post<ResponseModel>(newPath,card);
  // }

  getAllCards():Observable<ListResponseModel<CreditCard>>{
    let newPath=this.apiUrl + "creditcards/getall"
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getCardByNumber(cardNumber: string): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + "creditcards/getbycardnumber?cardnumber=" + cardNumber;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getCardById(cardId: number): Observable<ListResponseModel<CreditCard>> {
    let newPath = this.apiUrl + "creditcards/getbyid?cardId=" + cardId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  getCardByCustomerId(customerId: number): Observable<ListResponseModel<CreditCard>> {
    let newPath = "https://localhost:44363/api/customers/getcardbycustomerid?customerId=" + customerId;
    return this.httpClient.get<ListResponseModel<CreditCard>>(newPath);
  }

  updateCard(card: CreditCard):Observable<ResponseModel> {
    let newPath = this.apiUrl + "creditcards/update";
    return this.httpClient.post<ResponseModel>(newPath, card)
  }

  addCard(card: CreditCard):Observable<ResponseModel> {
    let newPath = this.apiUrl + "creditcards/add";
    return this.httpClient.post<ResponseModel>(newPath, card)
  }
}
