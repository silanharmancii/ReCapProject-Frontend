import { DecimalPipe } from "@angular/common";

export interface Car{
    carId:number,
    carName:string,
    brandId:number,
    colorId:number,
    brandName:string,
    colorName:string,
    dailyPrice:number,
    imagePath:string,
    modelYear:string,
    description:string,
    status:boolean
}