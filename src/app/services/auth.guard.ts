import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from "./auth.service";
import { SocialAuthService } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService,
    private socialService: SocialAuthService){}
    canActivate(
      route: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const user = this.authService.userValue;
        const social_login = this.socialService.authState;
        console.log(user);
        //return this.authService.isLoggedIn();
        if (user) {
          // check if route is restricted by role
          if (route.data['roles'] && route.data['roles'].indexOf(user.role) === -1) {
            console.log(user.role, route.data['roles'].indexOf(user.role));
              // role not authorised so redirect to home page
              this.router.navigate(['/login']);
              return false;
          }
          // authorised so return true
          return true;
      }
    //   else if (social_login) {
    //     // authorised so return true
    //     return true;
    // }
      // not logged in so redirect to login page with the return url
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
      return false;
  }
}
