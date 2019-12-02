import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';


@Component({
  selector: 'wa-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }
  type:string='celsius';

  ngOnInit() {
  //this.weatherService.degSet("celsius");

  }

  changeDeg(type:string){
    console.log(type);
    if(this.type != type){
      this.weatherService.degSet(type);

      this.type=type;
    }
  }



}
