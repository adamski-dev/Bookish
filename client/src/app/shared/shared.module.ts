import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagingComponent } from './paging/paging.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalComponent } from './order-total/order-total.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './components/text-input/text-input.component';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagingComponent,
    OrderTotalComponent,
    TextInputComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot(),
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagingComponent,
    CarouselModule,
    OrderTotalComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent
  ]
})

export class SharedModule { }
