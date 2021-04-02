import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-update',
  templateUrl: './color-update.component.html',
  styleUrls: ['./color-update.component.css']
})
export class ColorUpdateComponent implements OnInit {

  color:Color;
  colorUpdateForm :FormGroup;

  constructor(private formBuilder:FormBuilder,
    private colorService:ColorService,
    private toastrService:ToastrService,
    private activatedRoute:ActivatedRoute
    ) { }

  ngOnInit(): void {
    this.setValues()
    
  }

  async setValues(){
    this.activatedRoute.params.subscribe(async (params) => {
      if (params['id']) {       
        await this.getColorById(params['id']);
        this.createColorUpdateForm();
      }
    });
  }

  createColorUpdateForm(){
  this.colorUpdateForm=this.formBuilder.group({
    brandName:[this.color.colorName,Validators.required],
    id:[{value:this.color.id,disabled:true}]

  })
  }

  update(){
    if(this.colorUpdateForm.valid){
      let colorModel:Color = Object.assign({},this.colorUpdateForm.getRawValue())  
      colorModel.id=Number(colorModel.id)   
      this.colorService.update(colorModel).subscribe(response=>{
        this.toastrService.success("Araba güncellendi", "Başarılı");
      })
      
    }else{
      this.toastrService.error("Formunuz eksik","Uyarı");
    }
  }

  async getColorById(brandId: number) {
   
    this.color = (await this.colorService.getColorById(brandId).toPromise()).data[0]
    
  }
 
}
