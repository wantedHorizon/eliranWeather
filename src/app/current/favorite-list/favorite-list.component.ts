import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WeatherService } from 'src/app/weather.service';



@Component({
  selector: 'wa-favorite-list',
  templateUrl: './favorite-list.component.html',
})
export class FavorieListComponent implements OnInit {

  listFav: string [];
  constructor(private ws: WeatherService){

  }

  ngOnInit(){
    this.listFav = this.ws.getFav();




  }




}
