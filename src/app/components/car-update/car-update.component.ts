import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CarService } from 'src/app/services/car.service';
import { __awaiter } from 'tslib';

@Component({
  selector: 'app-car-update',
  templateUrl: './car-update.component.html',
  styleUrls: ['./car-update.component.css']
})
export class CarUpdateComponent implements OnInit {

  car:Car;
  carUpdateForm :FormGroup;

  constructor(private formBuilder:FormBuilder,
    private carService:CarService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.setValues()
    
  }

  async setValues(){
    this.activatedRoute.params.subscribe(async (params) => {
      if (params['carId']) {       
        await this.getCarDetailsByCarId(params['carId']);
        this.createCarUpdateForm();
      }
    });
  }

  createCarUpdateForm(){
  this.carUpdateForm=this.formBuilder.group({
    carName:[this.car.carName,Validators.required],
    dailyPrice:[this.car.dailyPrice,Validators.required],
    brandId:[this.car.brandId,Validators.required],
    colorId:[this.car.colorId, Validators.required],
    modelYear:[this.car.modelYear,Validators.required],
    description:[this.car.description,Validators.required],
    carId:[{value:this.car.carId,disabled:true}]

  })
  }

  update(){
    if(this.carUpdateForm.valid){
      let carModel:Car = Object.assign({},this.carUpdateForm.getRawValue())  
      carModel.carId=Number(carModel.carId)   
      this.carService.update(carModel).subscribe(response=>{
        this.toastrService.success("Araba güncellendi", "Başarılı");
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Uyarı");
    }
  }

  async getCarDetailsByCarId(carId: number) {
   
    this.car =(await this.carService.getCarDetailsByCarId(carId).toPromise()).data[0]
    
  }

}
