import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class CarDetailComponent implements OnInit {

  carImages:CarImage[]=[];
  cars:Car[]=[];
  apiUrl : string = "https://localhost:44363";
  dataLoaded=false;

  constructor(private carService:CarService, 
    private carImageService:CarImageService,  
    private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
       this.getCarDetailsByCarId(params["carId"]),
       this.getCarImagesByCarId(params["carId"])
      }
     
    })
  }

  getCarImagesByCarId(carId:number){
    this.carImageService.getCarImagesByCarId(carId).subscribe(response=>{
      this.carImages =response.data
      this.dataLoaded=true;
    })
  }

  getCarDetailsByCarId(carId:number){
    this.carService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.cars=response.data;
      this.dataLoaded=true;
    })
  
  }

  getImagePath(image:string){
   return this.apiUrl + image;
  }

}
