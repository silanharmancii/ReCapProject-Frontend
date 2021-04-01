import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { RentalComponent } from './components/rental/rental.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/cardetail/:carId', component:CarDetailComponent},
  { path: 'rental/:carId', component:RentalComponent},
  { path: 'rent-car/:carId', component:RentCarComponent},
  { path: 'payment/rental', component:PaymentComponent},
  { path: 'cars/add', component:CarAddComponent},
  { path: 'brands/add', component:BrandAddComponent},
  { path: 'colors/add', component:ColorAddComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
