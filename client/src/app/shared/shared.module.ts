import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './paging-header/paging-header.component';
import { PagingComponent } from './paging/paging.component';
import { CarouselModule } from 'ngx-bootstrap/carousel';


@NgModule({
  declarations: [
    PagingHeaderComponent,
    PagingComponent
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
    CarouselModule
  ]
})

export class SharedModule { }
