import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RegisterModel } from '../models/registerModel';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = "https://localhost:44363/api/"

  constructor(private httpClient: HttpClient) { }

  update(registerModel: RegisterModel): Observable<ResponseModel> {

    return this.httpClient.post<ResponseModel>(this.apiUrl + "users/update", registerModel);
  }

  getUserById(userId: number): Observable<SingleResponseModel<User>> {

    let newPath = this.apiUrl + 'users/getuserbyid?userId=' + userId;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  getUserByEmail(email: string): Observable<SingleResponseModel<User>> {

    let newPath = this.apiUrl + 'users/getuserbyemail?email=' + email;
    return this.httpClient.get<SingleResponseModel<User>>(newPath);
  }

  addFindexPoint(userId: number): Observable<ResponseModel> {
    
    return this.httpClient.post<ResponseModel>(this.apiUrl + 'users/addfindexpoint',userId);
  }
}
