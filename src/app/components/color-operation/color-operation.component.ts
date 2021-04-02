import { Component, OnInit } from '@angular/core';
import { Color } from 'src/app/models/color';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-color-operation',
  templateUrl: './color-operation.component.html',
  styleUrls: ['./color-operation.component.css']
})
export class ColorOperationComponent implements OnInit {

  colors:Color[];

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }
  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors=response.data;
    })
  }
}
