export interface Rental{
    rentalId?:number;
    carId:number;
    brandName:string;
    colorName:string;
    carModelYear:string;
    carDailyPrice:number;
    carDescription:string;
    carName:string;
    rentDate:Date;
    returnDate:Date;
    customerId?:number,
}