import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit{

  order?: IOrder;
  
  constructor(private orderService: OrdersService, private route: ActivatedRoute,
      private bcService: BreadcrumbService){}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.orderService.getOrderDetails(+ id).subscribe({
      next: order => {
        this.order = order;
        this.bcService.set('@orderDetails', `Order# ${order.id} - ${order.status}`);
      }
    })
  }

}
