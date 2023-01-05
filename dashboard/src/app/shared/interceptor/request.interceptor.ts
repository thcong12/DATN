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
  Observable,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { AuthService } from '../service/auth.service';
import { LoaderService } from '../service/loader.service';

@Injectable({
  providedIn: 'root',
})
export class RequestInterceptor implements HttpInterceptor {
  constructor(private authservice: AuthService,private loader:LoaderService) {}
  
  refreshingAccessToken!: boolean;

  accessTokenRefreshed: Subject<any> = new Subject();

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<any> {
    // Handle the request
    // this.loader.show()
    const token = this.authservice.getAccessToken();
    if (!!token) {
      request = request.clone({
        headers: request.headers.set('x-access-token', String(token)),
      });
    }

    // call next() and handle the response
    return next.handle(request)
  }

}
