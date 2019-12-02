import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CurrentWeather } from '../current-weather';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'wa-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.css']
})

export class CurrentComponent implements OnInit, OnDestroy {
  @ViewChild('form') signhupForm: NgForm;
  listFav:string[] ;
  myWeather:CurrentWeather;
  displayedCity: string = "";
  tracker;
  degTypeChanged;
  degType="celsius";

  constructor(private ws:WeatherService, private route: ActivatedRoute) { }

  ngOnInit() {

    this.degType=this.ws.DegCurrentType;
    this.listFav = this.ws.getFav();
    this.tracker=this.ws.favoritesChanged
      .subscribe(
        (str: string[]) => {
          this.listFav = str;
        }
      );

      this.  degTypeChanged= this.ws.DegChanged
      .subscribe(
        (str:string) => {
          this.degType=str;
        }
      );


this.route.data.subscribe(
      (data:{myWeather:CurrentWeather}) => {
        this.myWeather = data.myWeather;
        this.displayedCity= this.myWeather.cityName;
     
      }
    );

}

toFer(num: number){
  return (num * 1.8 +32).toFixed(1);
}


checkDeg(){
  if(this.degType == "celsius")
  return false;
  else
  return true
}
ngOnDestroy(){
  this.tracker.unsubscribe();
  this.degTypeChanged.unsubscribe();

}

removeFromFav(city:string){
  this.ws.removeFromFav(city);

}
addtoFav(city:string){
  this.ws.addtoFav(city);
}
isfavorite(city:string){
 return this.listFav.includes(city);

}

onCitySelect(loc: string){
  this.displayedCity=loc;
  this.ws.anotherCityWeather(loc).subscribe(
    (data) =>

    this.myWeather = new CurrentWeather(
      data.name+', '+data.sys.country,
      data.main.temp.toFixed(1),
      data.weather[0].icon,
      data.weather[0].description,
      data.main.temp_max.toFixed(1),
      data.main.temp_min.toFixed(1)),




  );

}

// onSubmit(weatherForm:NgForm){
//   this.onCitySelect(weatherForm.value.city);


// }

checkCityChaged(city: string){
console.log(this.displayedCity+"  == " +city +" |"+this.displayedCity == city);

  if(this.displayedCity == city )
  return true;
  
  else return false;
}
onSubmit(weatherForm:NgForm){

  this.onCitySelect(weatherForm.value.city);
  
  //console.log(weatherForm);
}

}
