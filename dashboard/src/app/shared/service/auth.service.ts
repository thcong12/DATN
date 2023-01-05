import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, shareReplay, tap } from 'rxjs';
import { AuthModule } from '../model/auth.model';
import { BaseService } from './base.service';
import { MessageService } from './messenger.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  public isLogin!:boolean
  constructor(http: HttpClient,private router:Router) {
    super(http);
  }
  private setSession(accessToken: string, refreshToken: string) {
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
  }
  private removeSession() {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
  public login(login: AuthModule.Login): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/dashboard/auth/login`;
    return me.httpClient.post(url, login, { observe: 'response' }).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {
        if (res.status === 200) {
          me.isLogin= true;
          console.log(res)
          me.setSession(
            String(res.headers.get('x-access-token')),
            String(res.headers.get('x-refresh-token'))
          );
          
        }
      })
    );
  }

  public getRefreshToken() {
    return localStorage.getItem('x-refresh-token');
  }
  public getAccessToken() {
    return localStorage.getItem('x-access-token');
  }
  public logout(): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/dashboard/auth/logout`;
    return me.httpClient
      .get(url)
      .pipe(
        shareReplay<any>(),
        tap((res: HttpResponse<any>) => {
          me.isLogin= false;
          console.log('ok1');
          me.removeSession()
        })
      );
  }
  public setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken)
  }
  getNewAccessToken() {
    const me = this;
    const url = `http://localhost:5000/api/dashboard/auth/refresh`;
    return this.httpClient.get(url, {
      headers: {
        'x-refresh-token': String(me.getRefreshToken()),
      },
      observe: 'response'
    }).pipe(
      tap((res: HttpResponse<any>) => {
        me.setAccessToken(String(res.headers.get('x-access-token')));
      })
    )
  }
}
