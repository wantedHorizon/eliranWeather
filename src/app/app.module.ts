import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { CurrentComponent } from './current/current.component';
import { ForecastComponent } from './forecast/forecast.component';
import {  AppRoutingModule } from './weather.routing';
import { WeatherService } from './weather.service';
import { ResolveLocationService } from './resolve-location.service';
import {MatListModule} from '@angular/material/list';

import {MatButtonToggleModule} from '@angular/material/button-toggle';



import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatSidenavModule,
  MatTabsModule
} from "@angular/material";
import {MatIconModule} from '@angular/material/icon';

import { FavorieListComponent } from './current/favorite-list/favorite-list.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CurrentComponent,
    ForecastComponent,
    FavorieListComponent


  ],
  imports: [
    
    MatButtonToggleModule,
    BrowserModule,
    MatIconModule,
    FormsModule,
    HttpModule,
    MatListModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatSidenavModule,
    MatTabsModule,
    ReactiveFormsModule,
    AppRoutingModule

  ],
  providers: [WeatherService, ResolveLocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
