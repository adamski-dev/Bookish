import { Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { ICategory } from '../shared/models/category';
import { IProduct } from '../shared/models/product';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {


  @ViewChild('search') searchDetail?: ElementRef;
  products: IProduct[];
  categories: ICategory[];
  types: IType[];
  shopParams: ShopParams;
  totalCount: number;

  sortOptions = [
    { name: 'Title', value: 'title' },
    { name: 'Author', value: 'author'},
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  constructor(private shopService: ShopService){
    this.shopParams = shopService.getShopParams();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts()
      .subscribe(response => (
          this.products = response.data,
          this.totalCount = response.count
        )),
      error => {
      console.log(error);
    };
  }

  getCategories(){
    this.shopService.getCategories().subscribe(response => (this.categories = [{id: 0, name: 'All'}, ...response])),
      error => {
      console.log(error);
    };
  }

  getTypes(){
    this.shopService.getTypes().subscribe(response => (this.types = response)),
      error => {
      console.log(error);
    };
  }

  onCategorySelected(categoryId: number){
    const params = this.shopService.getShopParams();
    params.categoryId = categoryId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    const params = this.shopService.getShopParams();
    params.typeId = typeId;
    params.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onSortSelected(sort: string){
    const params = this.shopService.getShopParams();
    params.sort = sort;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onPageChanged(event: any){
    const params = this.shopService.getShopParams();
    if(params.pageNumber !== event){
      params.pageNumber = event;
      this.shopService.setShopParams(params);
      this.shopParams = params;
      this.getProducts();
    }
  }

  onSearch(){
    const params = this.shopService.getShopParams();
    params.search = this.searchDetail.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.shopService.setShopParams(params);
    this.shopParams = params;
    this.getProducts();
  }

  onReset(){
    if(this.searchDetail) this.searchDetail.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.shopService.setShopParams(this.shopParams);
    this.getProducts();
  }

}
