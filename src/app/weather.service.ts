import { Injectable } from '@angular/core';
import { CurrentWeather } from './current-weather';
import { Http } from '@angular/http';
import { ForecastObject } from './forecast-object';
import { Observable, Subject, throwError } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { catchError } from 'rxjs/operators';

import { EventEmitter } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  favoritesChanged = new EventEmitter<string[]>();
  DegChanged = new EventEmitter<string>();
  DegCurrentType="celsius";




  myWeather: CurrentWeather ;
  favorites: string[] = ['Tel Aviv, IL'];
  constructor(private http: Http) { }
  location;

  degSet(type:string){
    
      this.DegCurrentType=type;
      this.DegChanged.emit(type);

    
  }

  errorHandler(error: HttpErrorResponse) {
    
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.log('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.log(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }
  

  removeFromFav(city:string){
    if(this.favorites.includes(city)){
    console.log(city);
    console.log(this.favorites);

   this.favorites.splice(this.favorites.indexOf(city),1 );

    this.favoritesChanged.emit(this.favorites.slice());


    }

  
  }
  addtoFav(city:string){
    if(!this.favorites.includes(city)){
      this.favorites.push(city)
      this.favoritesChanged.emit(this.favorites.slice());


    }

  }
  getFav(){
    return this.favorites.slice();
  }
  // weatherNow(){
  //   return this.myWeather;
  // }

  localWeather(){
    // console.log("lon:"+lon+"  lat:"+lat);
    // return this.http.get('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=3e4a53abcd9a2d0cca343c015f0c3e6b&units=metric')
    // .map( (res) => res.json() ) ;

    return new Promise( (res, rej) => {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.location = pos.coords;
        const lat = this.location.latitude;
        const lon = this.location.longitude;
        return this.http.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3e4a53abcd9a2d0cca343c015f0c3e6b&units=metric`)
     .map( (response) => response.json()).toPromise().then(
        (data) => {
        //  console.log(data);
          this.myWeather = new CurrentWeather(
            data.name+', '+data.sys.country,
            data.main.temp.toFixed(1),
            data.weather[0].icon,
            data.weather[0].description,
            data.main.temp_max.toFixed(1),
            data.main.temp_min.toFixed(1)) ;
            res(this.myWeather);
            return this.myWeather;
        }
     ).catch((any) =>{console.log(any)}) ;

      })

    })




  }


  anotherCityWeather(city: string) {
    return  this.http.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3e4a53abcd9a2d0cca343c015f0c3e6b&units=metric`)
    .catch(this.errorHandler)
    .map( (res) => res.json() ) ;

    




  }

  //

  fiveDayForecast(city:string){
    return this.http.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=3e4a53abcd9a2d0cca343c015f0c3e6b&units=metric`)
    
    
    .map( (response) => response.json());
  }

}
