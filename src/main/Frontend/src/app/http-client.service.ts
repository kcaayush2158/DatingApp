import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private _httpClient : HttpClient) { }

  public login(username:string,password:string){
    const headers= new HttpHeaders({Authorization:'Basic'+btoa(username+":"+password)})
    return this._httpClient.get("http://localhost:8080/",{headers,responseType: 'text' as 'json'})
  }

  getUser(){
    let username='';
    let password='';
    const headers = new HttpHeaders({Authorization:'Basic'+btoa(username+':'+password)});
    return this._httpClient.get<User[]>('http://localhost:8080/api/user',{headers});
  }

  public deleteUser(){
      let username='';
      let password='';
      const headers= new HttpHeaders({Authorization:'Basic'+btoa(username+":"+password)});
      return this._httpClient.delete<User>('http://localhost:8080/user'+"/"+User,{headers});
  }
//create the user
  public createUser(user){
    let username='';
    let password='';
    return this._httpClient.post<User>('http://localhost:8080/api/user/create',user);
    // const headers= new HttpHeaders({Authorization:'Basic'+btoa(username+":"+password)});
    // return this._httpClient.post<User>('http://localhost:8080/api/user/create'+"/"+User,{headers});
}
//authenticate fuction takes username,passwords as the arguments and it set the username and password in the sessionStorage
authenticate(username,password){
  const headers = new HttpHeaders({Authorization:'Basic'+btoa(username+":"+password)});
  return this._httpClient.get<User>('http://localhost:8080/user/validlogin'+"/",{headers}).pipe(
   map(
       userData => {
        sessionStorage.setItem('username',username);
        return userData;
       }
     )
  );
}
// helps to authenticate the username from the sessionStorage
isUserLogin(){
  let user = sessionStorage.getItem('username');
  console.log(!(user === null))
  return !(user === null )
}
// helps to remove the sessionStorage username
logout(){
  sessionStorage.removeItem('username')
}
}
