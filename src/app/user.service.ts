import { Injectable } from '@angular/core';
import {HttpClient, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  searchUser :any=[];
  data:any;

  setUser(user){
    this.searchUser= user;
  }

  getUser(){
   return this.searchUser;
  }

  setData(data){
    this.data =data;
  }

  getData(){
    return this.data;
  }


  constructor(private _http: HttpClient) { }
  

  
}

@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}