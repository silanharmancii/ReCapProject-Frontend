import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rent-car',
  templateUrl: './rent-car.component.html',
  styleUrls: ['./rent-car.component.css'],
})
export class RentCarComponent implements OnInit {
  car:Car;
  cars: Car[]=[];
  rental: Rental;
  customers: Customer[] = [];
  rentDate: Date;
  returnDate: Date;
  rentForm: FormGroup;
  payVisible = false;

  minDate: string | any;
  maxDate: string | null;
  maxMinDate: string | null;
  firstDateSelected: boolean = false;

  constructor(
    private activedRoute: ActivatedRoute,
    private toastrService: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private carService: CarService,
    private customerService: CustomerService,
    private rentalService: RentalService,
  ) {}

  ngOnInit(): void {
    this.activedRoute.params.subscribe((params) => {
      this.getCarDetail(params['carId']);
      this.getCustomers(), this.createRentForm();
    });
  }

  getCarDetail(carId: number) {
    this.carService.getCarDetailsByCarId(carId).subscribe((response) => {
      this.car = response.data[0];
    });
  }

  getCustomers() {
    this.customerService.getCustomers().subscribe((response) => {
      this.customers = response.data;
      console.log(response.data)
    });
  }

  createRentForm() {
    this.rentForm = this.formBuilder.group({
      rentDate: ['', Validators.required],
      returnDate: [''],
      carId: [''],
      customerId: ['', Validators.required],
    });
  }

   rent() {
    if (this.rentForm.valid) {
      var data = Object.assign({}, this.rentForm.value);
      data.carId = this.car.carId;
      data.customerId = parseInt(data.customerId);
      this.rental = data;
      this.payVisible = true;
      this.toastrService.info('Odeme Sayfasina Yonlendiriliyorsunuz.');
    } else {
      this.toastrService.error('Bilgilerin dogrulugundan emin olun.', 'HATA!');
    }
  }

}