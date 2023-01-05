import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, Subject, tap } from 'rxjs';
import { User } from '../model/account.model';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  public cartList = new BehaviorSubject<any[]>([]);
  public userLibrary = new BehaviorSubject<any[]>([]);
  public total = new BehaviorSubject<number>(0);
  constructor(http: HttpClient) {
    super(http);
  }
  public getCart(): Observable<User.Cart> {
    const me = this;
    const url = `/cart`;
    return me.get(url)
  }
  public addToCart(product: User.CartDetail) {
    const me = this;
    const url = `/cart`;
    return me.post(url, product);
  }
  public removeFromCart(id: string) {
    const me = this;
    const url = `/cart/removeproduct/${id}`;
    return me.get(url);
  }
  public postComment(
    id: string,
    comment: User.Comment
  ): Observable<User.Comment> {
    const me = this;
    const url = `/products/newcomment/${id}`;
    return me.put(url, comment);
  }
  public userDetail(id: string): Observable<User.Detail> {
    const me = this;
    const url = `/user/userDetail/${id}`;
    return me.get(url);
  }
  public getOrderUser(){
    const me =this
    const url = `/order/userorder`
    return me.get(url)
  }
  public getOrderDetail(id:string){
    const me =this
    const url = `/order/getorder/${id}`
    return me.get(url)
  }
  public setDataRecomend(id:string):Observable<any>{
    const me    = this;
    const url = `/dataset/click/${id}`
    return me.get(url)
  }
  public getLibraries():Observable<any>{
    const me    = this;
    const url = `/profile/library`
    return me.get(url)
  }
  public changeProfile():Observable<any>{
    const me    = this;
    const url = `/profile/user`
    return me.get(url)
  }
  public getReCommendProduct(){
    const me = this;
    const url = `/recommend/data`
    return me.get(url)
  }
  public getWishlist(){
    const me = this;
    const url = `/profile/wishlist`
    return me.get(url)
  }
  public addToWishList(id:string){
    const me = this;
    const url = `/profile/wishlist`
    return me.post(url,id)
  }
}
