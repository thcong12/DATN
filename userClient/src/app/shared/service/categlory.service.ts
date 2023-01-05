import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class CategloryService extends BaseService{
  constructor(http: HttpClient) {
    super(http);
  }
   public getCateglorys():Observable<Product.Categlory[]>{
    const me = this;
    const url = `/categlorys`;
    return me.get(url);
  }
  public getCateglory(id:string):Observable<Product.Categlory>{
    const me = this;
    const url = `/categlorys/${id}`;
    return me.get(url);
  }
  public getProductByCateglory(name:string):Observable<Product.Detail[]>{
    const me =this;
    const url = `/categlorys/list/${name}`
    return me.get(url)
  }
}
