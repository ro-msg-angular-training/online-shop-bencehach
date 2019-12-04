import {Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree} from '@angular/router';

import {AuthenticationService} from './authentication.service';
import {User} from './User';
import {Observable} from 'rxjs';

// class Permissions {
//   canGoToRoute(user: User, id: string): boolean {
//     return true;
//   }
// }

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private permission: Permissions, private currentUser: User
  ) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const currentUser = this.authenticationService.currentUserValue;
    if (currentUser) {
      debugger
      //   authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});

    // return this.permission.canGoToRoute(this.currentUser, route.params.id);

    return false;

    // const requiresLogin = route.data.requiresLogin || false;
    // if (requiresLogin) {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
    // return true;
  }
}
