import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagingComponent } from './paging/paging.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalComponent } from './order-total/order-total.component';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagingComponent,
    OrderTotalComponent
  ],
  imports: [
    CommonModule,
    PaginationModule.forRoot(),
    CarouselModule.forRoot()
  ],
  
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    PagingComponent,
    CarouselModule,
    OrderTotalComponent
  ]
})

export class SharedModule { }
