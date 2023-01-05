import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Account, TypeAdmin } from '../model/account.model';
import { BaseService } from './base.service';
import { MessageService } from './messenger.service';

@Injectable({
  providedIn: 'root',
})
export class AccountAdminService extends BaseService {
  constructor(http: HttpClient) {
    super(http);
  }
  public accountAdminList():Observable<Account.Admin[]>{
    const me =this;
    const url = `account`
    return me.get(url);
  }
  public accountUser(){
    const me =this;
    const url = `user/`
    return me.get(url);
  }
  public typeAdminDetail(id:string):Observable<any>{
    const me =this;
    const url = `account/typeAdmin/${id}`
    return me.get(url);
  }
}
