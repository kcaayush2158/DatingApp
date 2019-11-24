import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User, Usersearch, UserLogin} from './user';
import { HttpHeaders } from '@angular/common/http';
import { HttpClientService } from './http-client.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  _url='http://localhost:8080/api/new';
  _urlSearch='http://localhost:8080/api/new';
  _urlLogin='http://localhost:8080/login';

  constructor(private _http: HttpClient) { }
  
  enroll(user : User){
    return this._http.post<any>(this._url,user)
  }

  searchUser(userSearchModel : Usersearch){
    return this._http.post<any>(this._url,userSearchModel)
  }

  loginUser(userLogin:UserLogin){
    return this._http.post<any>(this._url,userLogin)
  }

}
