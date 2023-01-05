import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageService } from './messenger.service';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';
import { Product } from '../model/products.model';

@Injectable({
  providedIn: 'root'
})
export class DevelopersService extends BaseService{

  constructor(http: HttpClient) {
    super(http);
  }
  public getDevelopers():Observable<Product.Developer[]>{
    const me = this;
    const url = `developers`;
    return me.get(url);
  }
  public getDeveloper(id:string):Observable<Product.Developer>{
    const me = this;
    const url = `developers/${id}`;
    return me.get<Product.Developer>(url);
  }
  public createDeveloper(dev:Product.Developer):Observable<Product.Developer>{
    const me = this;
    const url = `developers`;
    return me.post(url,dev);
  }

  public updateDeveloper(id:string,dev:Product.Developer):Observable<Product.Developer>{
    const me = this;
    const url = `developers/${id}`;
    return me.put(url,dev);
  }

}
