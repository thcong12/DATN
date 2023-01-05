import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Product } from '../model/products.model';
@Injectable({
  providedIn: 'root',
})
export class DiscountsService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }

  public getDiscounts(): Observable<Product.Discount[]> {
    const me = this;
    const url = `/discounts`;
    return me.get(url);
  }
  public getDiscount(id: string): Observable<Product.Discount> {
    const me = this;
    const url = `/discounts/${id}`;
    return me.get(url);
  }
}
