import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from 'ng4-social-login';
import { LocalStorageService } from 'ngx-webstorage';
import { Observable } from 'rxjs';
import { HttpClientService } from './http-client.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate  {

  constructor(private auth:HttpClientService,private localStorageService:LocalStorageService,private router:Router){

  }
  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
      if(this.localStorageService.retrieve('user') !=null){
        return true;
      }
      else{
    
        this.router.navigateByUrl("/login");
    return false;
      }

  }
  
}
