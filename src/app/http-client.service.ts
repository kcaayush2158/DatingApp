import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs/Observable';

interface myData{
  success:boolean,
  message:string
}

@Injectable({
  providedIn: 'root'
})


export class HttpClientService {

   loggedInStatus=false;

   setLoggedIn(value:boolean){
      this.loggedInStatus=value;
   }

   get isLoggedIn(){
     return this.loggedInStatus;
   }


  constructor(private _httpClient : HttpClient) { }


public loginUser(user:User):Observable<myData>{
  return this._httpClient.post<myData>("http://localhost:8080/user/login",user);

}


  
// //authenticate fuction takes username,passwords as the arguments and it set the username and password in the sessionStorage
// authenticate(username,password){
//   const headers = new HttpHeaders({Authorization:'Basic'+btoa(username+":"+password)});
//   return this._httpClient.get<User>('http://localhost:8080/user/validlogin'+"/",{headers}).pipe(
//    map(
//        userData => {
//         sessionStorage.setItem('email',email);
//         return userData;
//        }
//      )
//   );
// }
// helps to authenticate the username from the sessionStorage
isUserLogin(){
  let user = sessionStorage.getItem('user');
  console.log(!(user === null))
  return !(user === null )
}
// helps to remove the sessionStorage username
logout(){
  sessionStorage.removeItem('user')
}
}
