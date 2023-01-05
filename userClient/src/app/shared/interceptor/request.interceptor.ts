import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import {
  catchError,
  empty,
  finalize,
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '../service/auth.service';
import { LoaderService } from '../service/loader.service';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authSv: AuthService, private router: Router, private loader: LoaderService,private userSv:UserService) { }
  refreshingAccessToken!: boolean;
  accessTokenRefreshed: Subject<any> = new Subject();
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    this.loader.show()
    
    const accessToken = this.authSv.getAccessToken();
    if (!!accessToken) {
      request = request.clone({
        headers: request.headers.set('x-access-token', String(accessToken)),
      });
    }

    // call next() and handle the response
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        switch (error.status) {
          case 401: {  return this.refreshAccessToken()
            .pipe(
              switchMap(() => {
                if (!!accessToken) {
                  request = request.clone({
                    headers: request.headers.set('x-access-token', String(accessToken)),
                  });
                }
                return next.handle(request);
              }),
              catchError((err: any) => {
                console.log(err);
                alert("something wrong")
                return empty();
              })
            )}
          case 404: {alert("something wrong");  break}
          case 403: { 
            alert("You need login"); 
            this.router.navigateByUrl('/auth/login');
            break;
          }
          case 500: {  break }
        }
        return throwError(error);
      }),
      finalize(() => setTimeout(()=>{
        this.loader.hide()
        
      },1000)),
    )
  }
  refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable(observer => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        })
      })
    } else {
      this.refreshingAccessToken = true;
      // we want to call a method in the auth service to send a request to refresh the access token
      return this.authSv.getNewAccessToken().pipe(
        tap((val) => {
          console.log("Access Token Refreshed!");
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next(val);
        })
      )
    }

  }

}
