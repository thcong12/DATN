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
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { LoaderService } from '../service/loader.service';

@Injectable({
  providedIn: 'root',
})
export class ResponseInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authservice: AuthService,private loader:LoaderService) {}
  refreshingAccessToken!: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.authservice.getAccessToken();
    if (!!token) {
      request = request.clone({
        headers: request.headers.set('x-access-token', String(token)),
      });
    }
    return next.handle(request).pipe(
      finalize(()=>{
        setTimeout(()=>{
          this.loader.hide()
        },2000)
       
      }),
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        const status = error.status;
        switch (+status) {
          case 400:
        
          case 401: {
            return this.refreshAccessToken().pipe(
              switchMap(() => {
                if (!!token) {
                  request = request.clone({
                    headers: request.headers.set(
                      'x-access-token',
                      String(token)
                    ),
                  });
                }
                return next.handle(request);
              }),
              catchError((err: any) => {
                console.log(err);
                alert("something wrong")
                return empty();
              })
            );
          }
          case 403: {
            alert('You cant see this content, ask the admin for more infomation');
            this.router.navigate(['/home']);
            break;
          }
          case 404:
          case 500:
        }

        return throwError(error);
      })
    );
  }
  private refreshAccessToken() {
    if (this.refreshingAccessToken) {
      return new Observable((observer) => {
        this.accessTokenRefreshed.subscribe(() => {
          // this code will run when the access token has been refreshed
          observer.next();
          observer.complete();
        });
      });
    } else {
      this.refreshingAccessToken = true;
      // we want to call a method in the auth service to send a request to refresh the access token
      return this.authservice.getNewAccessToken().pipe(
        tap((val) => {
          console.log('Access Token Refreshed!');
          this.refreshingAccessToken = false;
          this.accessTokenRefreshed.next(val);
        })
      );
    }
  }
}
