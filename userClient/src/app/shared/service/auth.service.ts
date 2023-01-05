import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import { AuthModule } from '../model/auth.model';
import { BaseService } from './base.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService extends BaseService {
  constructor(http: HttpClient, private router: Router) {
    super(http);
    this.updateAuth()
  }
  public redirectUrl: string | null = null;

  public isLogin = new BehaviorSubject<boolean>(this.isAuth());
  private setSession(accessToken: string, refreshToken: string,userInfo:string) {
    localStorage.setItem('x-access-token', accessToken);
    localStorage.setItem('x-refresh-token', refreshToken);
    localStorage.setItem('userDetail',userInfo)
  }
  private removeSession() {
    localStorage.removeItem('x-access-token');
    localStorage.removeItem('x-refresh-token');
  }
  public isAuth(): boolean {
    return this.getRefreshToken() !== null;
  }
  public updateAuth() {
    if (this.getRefreshToken() !== null) return this.isLogin.next(true);
    if (this.getRefreshToken() === null) {
      return this.isLogin.next(false);
    }
  }
  public login(login: AuthModule.Login): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/store/user/login`;
    return me.httpClient.post(url, login, { observe: 'response' }).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {
        if (res.status === 200) {
          me.setSession(
            String(res.headers.get('x-access-token')),
            String(res.headers.get('x-refresh-token')),
            String(JSON.stringify(res.body?.userDetail))
          )
          
          return this.isLogin.next(true);
          // we have logged in successfull
        }
        if (res.status === 403) {
          alert('please check your email');
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
    const url = `http://localhost:5000/api/store/user/logout`;
    return me.httpClient
      .get(url, {
        headers: { 'x-refresh-token': String(this.getRefreshToken()) },
        observe: 'response',
      })
      .pipe(
        shareReplay<any>(),
        tap((res: HttpResponse<any>) => {
          alert('Logout successful');
          me.removeSession();
          localStorage.setItem('userDetail','')
          return this.isLogin.next(false);
        })
      );
  }
  public register(user: AuthModule.Register): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/store/user/signup`;
    return me.httpClient.post(url, user, { observe: 'response' }).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {
        if(res.status === 200){
          alert('Account have been create please check your email to active the account')
        }else{
          alert("some thing wrong")
        }
        
      })
    );
  }
  public userActive(token: string): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/store/user/useractice/${token}`;
    return me.httpClient
      .get(url, {
        headers: {},
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          alert('account active successful');
        })
      );
  }
  public forgotPassword(formInput: any): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/store/user/forgotpassword`;
    return me.httpClient.post(url, formInput, { observe: 'response' }).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {})
    );
  }
  public changePassword(
    token: string,
    password: any
  ): Observable<HttpResponse<any>> {
    const me = this;
    const url = `http://localhost:5000/api/store/user/changepassword/${token}`;
    return me.httpClient.post(url, password, { observe: 'response' }).pipe(
      shareReplay<any>(),
      tap((res: HttpResponse<any>) => {})
    );
  }
  public setAccessToken(accessToken: string) {
    localStorage.setItem('x-access-token', accessToken);
  }
  getNewAccessToken() {
    const me = this;
    const url = `http://localhost:5000/api/store/user/refresh`;
    return this.httpClient
      .get(url, {
        headers: { 'x-refresh-token': String(this.getRefreshToken()) },
        observe: 'response',
      })
      .pipe(
        tap((res: HttpResponse<any>) => {
          me.setAccessToken(String(res.headers.get('x-access-token')));
        })
      );
  }
}
