import { Injectable } from '@angular/core';
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivateChild,
  NavigationExtras,
  CanLoad,
  Route,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private authsv: AuthService, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | boolean {
    if (!this.authsv.isAuth()) {
      this.router.navigate(['/home']);
    }
    return this.authsv.isAuth();
  }

  checkLogin(): boolean {
    if (this.authsv.isLogin) {
      return false;
    }
    // Store the attempted URL for redirecting
    // Create a dummy session id
    const sessionId = 123123123;

    // Set our navigation extras object
    // that contains our global query params and fragment
    const navigationExtras: NavigationExtras = {
      queryParams: { session_id: this.authsv.getRefreshToken() },
    };

    // Navigate to the login page with extras
    this.router.navigate(['/home'], navigationExtras);
    return true;
  }
}
