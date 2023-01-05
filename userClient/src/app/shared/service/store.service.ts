import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, Store } from '../model/products.model';
import { BaseService } from './base.service';


@Injectable({
  providedIn: 'root'
})
export class StoreService extends BaseService{
  constructor(http: HttpClient) {
    super(http);
  }
  public getProductsSlider(): Observable<Store.Slider[]> {
    const me = this;
    const url = `/tool/getProductSlide`;
    return me.get(url);
  }
  public search(keyword:string):Observable<any>{
    const me = this;
    const url = `/tool/search/${keyword.replace(/\s/g, "").toLowerCase()}`
    return me.get(url)
  }
  public findSameProduct(cate:string){
    const me =this
    const url = `/tool/sameproduct/${cate}`
    return me.get(url);
  }
  public getBestSeller():Observable<Store.BestSeller[]>{
    const me = this;
    const url = `/tool/bestseller`
    return me.get(url)
  }
  public getSaleProduct():Observable<any>{
    const me = this;
    const url = `/tool/getProductSale`
    return me.get(url)
  }
  public filterProduct(value:any):Observable<any>{
    const me = this;
    const url = `/tool/filter`
    return me.post(url,value)
  }
}
