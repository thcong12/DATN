import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../model/products.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class FeatureService extends BaseService{
  constructor(http: HttpClient ) {
    super(http);
  }
   public getFeatures():Observable<Product.Feature[]>{
    const me = this;
    const url = `/features`;
    return me.get(url);
  }
  public getFeature(id:string):Observable<Product.Feature>{
    const me = this;
    const url = `/features/${id}`;
    return me.get(url);
  }
  public createFeature(cate:Product.Feature):Observable<Product.Feature>{
    const me = this;
    const url = `/features`;
    return me.post(url,cate);
  }

  public updateFeature(id:string,cate:Product.Feature):Observable<Product.Feature>{
    const me = this;
    const url = `/features/${id}`;
    return me.put(url,cate);
  }
}