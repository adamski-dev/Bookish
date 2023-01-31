import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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
export class ShopComponent implements OnInit{


  @ViewChild('search') searchDetail?: ElementRef;
  products: IProduct[];
  categories: ICategory[];
  types: IType[];
  shopParams = new ShopParams();
  totalCount: number;

  sortOptions = [
    { name: 'Title', value: 'title' },
    { name: 'Author', value: 'author'},
    { name: 'Price: Low to High', value: 'priceAsc' },
    { name: 'Price: High to Low', value: 'priceDesc' }
  ];

  
  constructor(private shopService: ShopService){

  }

  ngOnInit(): void {
    this.getProducts();
    this.getCategories();
    this.getTypes();
  }

  getProducts(){
    this.shopService.getProducts(this.shopParams)
      .subscribe(response => (
          this.products = response.data,
          this.shopParams.pageNumber = response.pageIndex,
          this.shopParams.pageSize = response.pageSize,
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
    this.shopParams.categoryId = categoryId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string){
    this.shopParams.sort = sort;
    this.getProducts();
  }

  onPageChanged(event: any){
    if(this.shopParams.pageNumber !== event){
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch(){
    this.shopParams.search = this.searchDetail.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset(){
    if(this.searchDetail) this.searchDetail.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }

}
