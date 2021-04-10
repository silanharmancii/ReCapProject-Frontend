import { identifierModuleUrl } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserInfo } from 'node:os';
import { Car } from 'src/app/models/car';
import { CreditCard } from 'src/app/models/creditCard';
import { Customer } from 'src/app/models/customer';
import { Rental } from 'src/app/models/rental';
import { CarService } from 'src/app/services/car.service';
import { CreditCardService } from 'src/app/services/credit-card.service';
import { CustomerService } from 'src/app/services/customer.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { PaymentService } from 'src/app/services/payment.service';
import { RentalService } from 'src/app/services/rental.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input() rental: Rental;
  @Input() car: Car;
  totalPrice: number ;
  payForm: FormGroup;
  creditCard:CreditCard;
  cardNumber:any;


  constructor(
    private formBuilder: FormBuilder,
    private toastrService: ToastrService,
    private paymentService: PaymentService,
    private rentalService: RentalService,
    private cardService: CreditCardService,
    private localStorageService:LocalStorageService,
    private userService:UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createPayForm();
    this.getRentSummary();
    this.cardNumber = this.localStorageService.get('cardNumber');
  }

  getRentSummary() {
    if (this.rental.returnDate != null) {
      var date1 = new Date(this.rental.returnDate.toString());
      var date2 = new Date(this.rental.rentDate.toString());
      var difference = date1.getTime() - date2.getTime();
      var totalDate = Math.ceil(difference / (1000 * 3600 * 24));
      this.totalPrice = totalDate * this.car.dailyPrice;
    } else {
      this.totalPrice = this.car.dailyPrice;
    }
  }

  createPayForm() {
    this.payForm = this.formBuilder.group({
      nameOnTheCard: [this.creditCard.nameOnTheCard, Validators.required],
      cardNumber: [this.creditCard.cardNumber, Validators.required],
      cardCvv: [this.creditCard.cardCvv, Validators.required],
      expirationMonth: [this.creditCard.expirationMonth, Validators.required],
      expirationYear: [this.creditCard.expirationYear, Validators.required],
    });
  }

  async pay() {
    if (this.payForm.valid) {
 
      let creditCard = Object.assign({}, this.payForm.getRawValue());
      this.creditCard = await this.getCardByCardNumber(this.creditCard.cardNumber);
      //this.creditCard = this.getCardByCardNumber(this.cardNumber);
      if(creditCard.totalMoney>=this.totalPrice ){
        creditCard.totalMoney - this.totalPrice;
        this.updateCard(creditCard);
        this.addFindexPoint();
        this.addRental();
      }

    } else {
      let payment = Object.assign({}, this.payForm.value);
      console.log(payment);
      this.toastrService.error('HATA!', 'Bilgilerin dogrulugundan emin olun.');
   }
 
  } 

  updateCard(creditCard: CreditCard) {
    this.cardService.updateCard(creditCard);
  }

  async getCardByCardNumber(cardNumber: string) {

    return (await this.cardService.getCardByNumber(cardNumber).toPromise())
    .data;
    // this.cardService.getCardByNumber(cardNumber).subscribe(response => {
    //   this.creditCard = response.data[0];
    // })
  }

  addFindexPoint() {
    this.userService
      .addFindexPoint(Number(this.localStorageService.get('userId')))
      .subscribe(
        (response) => {
          this.toastrService.success(response.message);
        },
        (responseError) => {
          this.toastrService.info(responseError.error.message);
        }
      );
  }

  addRental() {
    this.rentalService.addRental(this.rental).subscribe(
      (response) => {
        this.toastrService.success('Odeme Islemi Onaylandi.', 'Iyi Yolculuklar.');
        if (!this.cardNumber) {
          if (window.confirm('Kredi kartı kaydedilsin mi?')) {
            this.saveCreditCard();
          }else{
            this.router.navigate(['/']);
          }
        }
      },
      (responseError) => {
        if (responseError.error.Errors.length > 0) {
          for (
            let index = 0;
            index < responseError.error.Errors.length;
            index++
          ) {
            this.toastrService.error(
              responseError.error.Errors[index].ErrorMessage,
              'Validation Error'
            );
          }
        }
      }
    );
  }

  saveCreditCard() {
    this.localStorageService.add(
      'nameOnTheCard',
      this.creditCard.nameOnTheCard
    );
    this.localStorageService.add(
      'cardNumber',
      this.creditCard.cardNumber
    );
    this.localStorageService.add(
      'expirationYear',
      this.creditCard.expirationYear
    );
    this.localStorageService.add(
      'expirationMonth',
      this.creditCard.expirationMonth
    );
    this.localStorageService.add(
      'cardCvv',
      this.creditCard.cardCvv
    );
   
    this.router.navigate(['/']);
  }
 
  
}


