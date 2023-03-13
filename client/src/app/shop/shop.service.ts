import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { ICategory } from '../shared/models/category';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { IProduct } from '../shared/models/product';
import { environment } from 'src/environment/environment';

@Injectable({
  providedIn: 'root'
})

export class ShopService {

  baseUrl = environment.apiUrl;
  products: IProduct[] = [];
  categories: ICategory[] = [];
  types: IType[] = [];
  pagination?: IPagination<IProduct[]>;
  shopParams = new ShopParams();
  productCache = new Map<string, IPagination<IProduct[]>>();

  constructor(private http: HttpClient) {
  }



  getProducts(useCache = true) {

    if(!useCache) this.productCache = new Map();
    if(this.productCache.size > 0 && useCache){
      if(this.productCache.has(Object.values(this.shopParams).join('-'))){
        this.pagination = this.productCache.get(Object.values(this.shopParams).join('-'));
        if(this.pagination) return of(this.pagination);
      }
    } 

    let params = new HttpParams();

    if(this.shopParams.categoryId !== 0) params = params.append('categoryId', this.shopParams.categoryId);
    if(this.shopParams.typeId !== 0) params = params.append('typeId', this.shopParams.typeId);
    
    params = params.append('sort', this.shopParams.sort);
    params = params.append('pageIndex', this.shopParams.pageNumber);
    params = params.append('pageSize', this.shopParams.pageSize);

    //search on page params only if search is used:
    if(this.shopParams.search) params = params.append('search', this.shopParams.search);
    
    return this.http.get<IPagination<IProduct[]>>(this.baseUrl + 'products', { params }).pipe(
      map(response => {
        this.productCache.set(Object.values(this.shopParams).join('-'), response);
        this.pagination = response;
        return response;
      })
    );
  }

  setShopParams(params: ShopParams){
    this.shopParams = params;
  }

  getShopParams(){
    return this.shopParams;
  }

  getCategories(){
    if(this.categories.length > 0) return of(this.categories);
    return this.http.get<ICategory[]>(this.baseUrl + 'products/categories').pipe(
      map(categories => this.categories = categories)
    );
  }

  getTypes(){

    //without cache (no this.categories)
    //return this.http.get<IType[]>(this.baseUrl + 'products/types');

    //with caching
    if(this.types.length > 0) return of(this.types);
    return this.http.get<IType[]>(this.baseUrl + 'products/types').pipe(
      map(types => this.types = types)
    );
  }

  getProduct(id: number){

    const product = [...this.productCache.values()]
      .reduce((accumulator, paginatedResult) => {
        return {...accumulator, ...paginatedResult.data.find(x => x.id === id)}
      }, {} as IProduct);

    console.log(product);

    if(Object.keys(product).length !== 0) return of(product);

    return this.http.get<IProduct>(this.baseUrl + 'products/' + id);
  }
}

