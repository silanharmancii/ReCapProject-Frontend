import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrandAddComponent } from './components/brand-add/brand-add.component';
import { BrandOperationComponent } from './components/brand-operation/brand-operation.component';
import { BrandUpdateComponent } from './components/brand-update/brand-update.component';
import { CarAddComponent } from './components/car-add/car-add.component';
import { CarDetailComponent } from './components/car-detail/car-detail.component';
import { CarOperationComponent } from './components/car-operation/car-operation.component';
import { CarUpdateComponent } from './components/car-update/car-update.component';
import { CarComponent } from './components/car/car.component';
import { ColorAddComponent } from './components/color-add/color-add.component';
import { ColorOperationComponent } from './components/color-operation/color-operation.component';
import { ColorUpdateComponent } from './components/color-update/color-update.component';
import { LoginComponent } from './components/login/login.component';
import { PaymentComponent } from './components/payment/payment.component';
import { RegisterComponent } from './components/register/register.component';
import { RentCarComponent } from './components/rent-car/rent-car.component';
import { RentalComponent } from './components/rental/rental.component';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: CarComponent },
  { path: 'cars', component: CarComponent },
  { path: 'cars/brand/:brandId', component: CarComponent },
  { path: 'cars/color/:colorId', component: CarComponent },
  { path: 'cars/cardetail/:carId', component:CarDetailComponent},
  { path: 'rental/:carId', component:RentalComponent},
  { path: 'rent-car/:carId', component:RentCarComponent},
  { path: 'payment/rental', component:PaymentComponent},
  { path: 'cars/add', component:CarAddComponent, canActivate:[LoginGuard]},
  { path: 'brands/add', component:BrandAddComponent},
  { path: 'colors/add', component:ColorAddComponent},
  { path: 'cars/car-operation', component:CarOperationComponent},
  { path: 'car-update/:carId', component:CarUpdateComponent},
  { path: 'brands/brand-operation', component:BrandOperationComponent},
  { path: 'brand-update/:brandId', component:BrandUpdateComponent},
  { path: 'colors/color-operation', component:ColorOperationComponent},
  { path: 'color-update/:colorId', component:ColorUpdateComponent},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},

  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
