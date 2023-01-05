import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService extends BaseService{
  public filterDeveloper = new BehaviorSubject<any>('')
  constructor(http: HttpClient) {
    super(http);
  }
  public getDevelopers():Observable<Product.Developer[]>{
    const me = this;
    const url = `/developers`;
    return me.get(url);
  }
  public getDeveloper(id:string):Observable<Product.Developer>{
    const me = this;
    const url = `/developers/${id}`;
    return me.get(url);
  }
  public createDeveloper(dev:Product.Developer):Observable<Product.Developer>{
    const me = this;
    const url = `/developers`;
    return me.post(url,dev);
  }

  public updateDeveloper(id:string,dev:Product.Developer):Observable<Product.Developer>{
    const me = this;
    const url = `/developers/${id}`;
    return me.put(url,dev);
  }

}
