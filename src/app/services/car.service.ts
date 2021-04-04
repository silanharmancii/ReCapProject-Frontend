import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Car } from '../models/car';
import { ListResponseModel } from '../models/listResponseModel';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  apiUrl="https://localhost:44363/api/";

  constructor(private httpClient: HttpClient) { }


  getAllCars():Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl + "cars/getallcars"
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }
  getCarsByBrand(brandId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl + "cars/getcarsbybrandid?brandId=" + brandId
    return this.httpClient.get<ListResponseModel<Car>>(newPath);
  }

  getCarsByColor(colorId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl + "cars/getcarsbycolorid?colorId=" + colorId
    return this.httpClient.get<ListResponseModel<Car>>(newPath)
  }
  getCarDetailsByCarId(carId:number):Observable<ListResponseModel<Car>>{
    let newPath=this.apiUrl + "cars/getcardetails?carId=" + carId
    return this.httpClient.get<ListResponseModel<Car>>(newPath); 
  }
  add(car:Car):Observable<ResponseModel>{
    
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/add",car,);
  }
  update(car:Car):Observable<ResponseModel>{
    
    return this.httpClient.post<ResponseModel>(this.apiUrl+"cars/update",car);
  }
 
}
