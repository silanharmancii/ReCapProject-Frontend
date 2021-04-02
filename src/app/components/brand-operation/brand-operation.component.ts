import { Component, OnInit } from '@angular/core';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';

@Component({
  selector: 'app-brand-operation',
  templateUrl: './brand-operation.component.html',
  styleUrls: ['./brand-operation.component.css']
})
export class BrandOperationComponent implements OnInit {

  brands:Brand[]
  constructor(private brandService:BrandService) { }

  ngOnInit(): void {
    this.getBrands();
  }

  getBrands() {
    this.brandService.getBrands().subscribe((response) => {
      this.brands = response.data;
    });
  }

}
