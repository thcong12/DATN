import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {Product } from '../model/products.model';
import { BaseService } from './base.service';
import { MessageService } from './messenger.service';


@Injectable({
  providedIn: 'root',
})
export class ProductsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public getProducts(): Observable<Product.Product[]> {
    const me = this;
    const url = `products`;
    return me.get(url);
  }
  public getProduct(id: String): Observable<Product.Product> {
    const me = this;
    const url = `products/${id}`;
    return me.get(url);
  }
  public getProductDetail(id: String): Observable<Product.Detail> {
    const me = this;
    const url = `products/detail/${id}`;
    return me.get(url);
  }
  public putProductDetail(id: String,prod:Product.Detail): Observable<Product.Detail> {
    const me = this;
    const url = `products/detail/${id}`;
    return me.put(url,prod);
  }
  public putProduct(id: String,prod:Product.Product):Observable<Product.Product>{
    const me = this;
    const url = `products/${id}`;
    return me.put(url,prod);
  }
  public createProduct(prod:Product.Product):Observable<Product.Product>{
    const me = this;
    const url = `products`;
    return me.post(url,prod);
  }

}
