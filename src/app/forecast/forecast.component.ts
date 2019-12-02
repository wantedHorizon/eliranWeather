import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { ForecastObject } from '../forecast-object';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'wa-forecast',
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.css']
})
export class ForecastComponent implements OnInit {

  constructor(private weatherService: WeatherService) { }
  forcastForm: FormGroup;
  cityForcast: ForecastObject[]=[];
  currentCity: string ="" ;
  listFav:string[] ;
  tracker;
  degTypeChanged;
  degType="celsius";
  @ViewChild('form') signhupForm: NgForm;

  ngOnInit() {

    this.listFav = this.weatherService.getFav();
    this.tracker=this.weatherService.favoritesChanged
      .subscribe(
        (fav: string[]) => {
          this.listFav = fav;
        }
      );

      
      this.  degTypeChanged= this.weatherService.DegChanged
      .subscribe(
        (str:string) => {
          this.degType=str;
        }
      );


    this.forcastForm = new FormGroup({
      forecastCity: new FormControl('')
    })
  }

  onCitySelect(loc: string){
   this.forcastForm.value.forecastCity=loc;
   this.signhupForm.value.city=loc;
  this. onSubmit(this.signhupForm);
  
  }

  toFer(num: number){
    return (num * 1.8 +32).toFixed(1);
  }
  

  onSubmit(form: NgForm){
   // console.log(this.forcastForm);
       if ((this.currentCity != form.value.city )){

        this.cityForcast.splice(0,this.cityForcast.length);

        this.weatherService.fiveDayForecast(form.value.city)
        .subscribe(
          (data) => {
              for(let i=0;i<data.list.length; i+=8){
                const temporary = new ForecastObject(data.list[i].dt_txt,
                  data.list[i].weather[0].icon,
                  data.list[i].main.temp_max,
                  data.list[i].main.temp_min

                  );
                  this.cityForcast.push(temporary);
              }
             // console.log(this.cityForcast);

          }
        );

        this.currentCity =form.value.city;
       }








  }

}
