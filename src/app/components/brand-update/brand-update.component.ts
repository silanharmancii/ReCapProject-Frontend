import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Brand } from 'src/app/models/brand';
import { BrandService } from 'src/app/services/brand.service';
import { __awaiter } from 'tslib';

@Component({
  selector: 'app-brand-update',
  templateUrl: './brand-update.component.html',
  styleUrls: ['./brand-update.component.css']
})
export class BrandUpdateComponent implements OnInit {

  brand:Brand;
  brandUpdateForm :FormGroup;

  constructor(private formBuilder:FormBuilder,
    private brandService:BrandService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.setValues()
    
  }

  async setValues(){
    this.activatedRoute.params.subscribe(async (params) => {
      if (params['id']) {       
        await this.getBrandById(params['id']);
        this.createBrandUpdateForm();
      }
    });
  }

  createBrandUpdateForm(){
  this.brandUpdateForm=this.formBuilder.group({
    brandName:[this.brand.brandName,Validators.required],
    id:[{value:this.brand.id,disabled:true}]

  })
  }

  update(){
    if(this.brandUpdateForm.valid){
      let brandModel:Brand = Object.assign({},this.brandUpdateForm.getRawValue())  
      brandModel.id=Number(brandModel.id)   
      this.brandService.update(brandModel).subscribe(response=>{
        this.toastrService.success("Araba güncellendi", "Başarılı");
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Uyarı");
    }
  }

  async getBrandById(brandId: number) {
   
    this.brand = (await this.brandService.getBrandById(brandId).toPromise()).data[0]
    
  }
 

}
