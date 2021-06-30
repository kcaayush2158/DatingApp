import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {

  constructor(private localStorage: LocalStorageService,private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
  
    
    if(!this.isAuthenticated()){
      return true;
    }else{
      this.router.navigateByUrl('/login');

    }
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('user');
    // Check whether the token is expired and return
    // true or false
    return true;
  }
}
