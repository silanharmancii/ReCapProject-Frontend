import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Car } from 'src/app/models/car';
import { CarImage } from 'src/app/models/carImage';
import { CarImageService } from 'src/app/services/car-image.service';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.css'],
})
export class CarComponent implements OnInit {

  cars: Car[]=[];
  carImages: CarImage[]=[];
  apiUrl : string = "https://localhost:44363";
  dataLoaded = false;
  filterText=""; 
  

  constructor(private carService: CarService,
    private carImageService: CarImageService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      if (params["brandId"]) {
        this.getCarsByBrand(params["brandId"])
      } else if (params["colorId"]) {
        this.getCarsByColor(params["colorId"])
      } else {
        this.getAllCars()
      }
    })
  }

  getAllCars() {
    this.carService.getAllCars().subscribe(response => {      
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
  getCarsByBrand(brandId: number) {
    this.carService.getCarsByBrand(brandId).subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
  getCarsByColor(colorId: number) {
    this.carService.getCarsByColor(colorId).subscribe(response => {
      this.cars = response.data
      this.dataLoaded = true;
    })
  }
 
}
