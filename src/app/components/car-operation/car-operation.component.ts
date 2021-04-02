import { Component, OnInit } from '@angular/core';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';

@Component({
  selector: 'app-car-operation',
  templateUrl: './car-operation.component.html',
  styleUrls: ['./car-operation.component.css']
})
export class CarOperationComponent implements OnInit {

  cars:Car[]=[];
  

  constructor(private carService:CarService) { }

  ngOnInit(): void {
    this.getAllCars();
  }

  getAllCars() {
    this.carService.getAllCars().subscribe(response => {      
      this.cars = response.data;
    })
  }

}
