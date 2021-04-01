import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  
  customer: Customer;
  getCustomerId: number;
  amountOfPayment: number=0 ;
  id:number;
  nameOnTheCard: string;
  cardNumber: string;
  cardCvv: string;
  expirationMonth:string;
  expirationYear: string;
  card: CreditCard;
  cardExist: Boolean = false;
  @Input() rental: Rental;
  @Input() car: Car;


  constructor(
    private activateRoute: ActivatedRoute,
    private carService: CarService,
    private customerService: CustomerService,
    private router: Router,
    private toastrService: ToastrService,
    private rentalService: RentalService,
    private cardService: CreditCardService
  ) {}

  ngOnInit(): void {
    this.activateRoute.params.subscribe((params) => {
      if (params['rental']) {
        this.rental = JSON.parse(params['rental']);
        this.getCustomerId = JSON.parse(params['rental']).customerId;
        this.getCustomerDetailById(this.getCustomerId);
        this.getCarDetail();
      }
    });
  }

  getCustomerDetailById(customerId: number) {
    this.customerService.getCustomerById(customerId).subscribe((response) => {
      this.customer = response.data[0];
      console.log(response);
    });
  }

  getCarDetail() {
    this.carService
      .getCarDetailsByCarId(this.rental.carId)
      .subscribe((response) => {
        this.car = response.data[0];
        this.paymentCalculator();
      });
  }

  paymentCalculator() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();

      //zamanFark değişkeni ile elde edilen saati güne çevirmek için aşağıdaki yöntem kullanılabilir.
      var numberOfDays = Math.ceil(difference / (1000 * 3600 * 24));
      console.log(numberOfDays);

      this.amountOfPayment += numberOfDays * this.car.dailyPrice;
      console.log(this.amountOfPayment);
      if (this.amountOfPayment <= 0) {
        this.router.navigate(['/cars']);
        this.toastrService.error(
          'Araç listesine yönlendiriliyorsunuz',
          'Hatalı işlem'
        );
      }
    }
  }

  async rentACar() {
    let card: CreditCard = {
      id:this.id,
      nameOnTheCard: this.nameOnTheCard,
      cardNumber: this.cardNumber,
      expirationMonth: this.expirationMonth,
      expirationYear:this.expirationYear,
      cardCvv: this.cardCvv,
    };
    this.cardExist = await this.isCardExist(card);
    if (this.cardExist) {   
        this.rentalService.addRental(this.rental);
        this.toastrService.success('Arabayı kiraladınız', 'Işlem başarılı');
      } else {
      this.toastrService.error('Bankanız bilgilerinizi onaylamadı', 'Hata');
    }
  }

  async isCardExist(card: CreditCard) {
    return (await this.cardService.isCardExist(card).toPromise())
      .success;
  }

  async getCardByCardNumber(cardNumber: string) {
    return (await this.cardService.getCardByNumber(cardNumber).toPromise())
      .data[0];
  }

  updateCard(card: CreditCard) {
    this.cardService.updateCard(card);
  }
}


