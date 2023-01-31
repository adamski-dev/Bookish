import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { ICategory } from '../shared/models/category';
import { IPagination } from '../shared/models/pagination';
import { IType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';

@Injectable({
  providedIn: 'root'
})
export class ShopService {

  baseUrl = 'https://localhost:5001/api/'

  constructor(private http: HttpClient) {}

  getProducts(shopParams: ShopParams){

    let params = new HttpParams();

    if(shopParams.categoryId !== 0) params = params.append('categoryId', shopParams.categoryId);

    if(shopParams.typeId !== 0) params = params.append('typeId', shopParams.typeId);
    

    params = params.append('sort', shopParams.sort);
    params = params.append('pageIndex', shopParams.pageNumber);
    params = params.append('pageSize', shopParams.pageSize);

    //search on page params:
    if(shopParams.search) params = params.append('search', shopParams.search);
    
    return this.http.get<IPagination>(this.baseUrl + 'products', {observe: 'response', params })
      .pipe(
        map(response => {
          return response.body;
        })
      );
  }

  getCategories(){
    return this.http.get<ICategory[]>(this.baseUrl + 'products/categories');
  }

  getTypes(){
    return this.http.get<IType[]>(this.baseUrl + 'products/types');
  }
}

