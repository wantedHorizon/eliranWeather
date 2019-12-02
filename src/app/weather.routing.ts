import { Routes, RouterModule } from '@angular/router';
import { CurrentComponent } from './current/current.component';
import { ForecastComponent } from './forecast/forecast.component';
import { ModuleWithProviders } from '@angular/core';
import { ResolveLocationService } from './resolve-location.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

const appRoutes:Routes = [
  {path:'', redirectTo: '/home' , pathMatch: 'full'},

  {path:'home', component: CurrentComponent, resolve: {myWeather: ResolveLocationService}},
  {path:'forecast', component: ForecastComponent},
];



@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
