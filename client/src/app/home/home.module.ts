import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CarouselModule,

  ],

  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
