import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import{AuthService,SocialUser,GoogleLoginProvider,FacebookLoginProvider} from 'ng4-social-login';
import { User, UserLogin } from '../user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientService } from '../http-client.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user : any = SocialUser;
  private loggedIn :boolean;
  userLoginModel = new  UserLogin('','');
  
  constructor(private _userService: UserService,private socialAuthService : AuthService,private _httpClient : HttpClient,private service:HttpClientService,private _router:Router) { }
  username:string;
  password:string;
  message:any;
  ngOnInit() {
    // this.socialAuthService.authState.subscribe((user=>{
    //   this.user = user;
    //   this.loggedIn =(user !=null);
    // }))
  }
    // for social-login 
    facebookLogin(){
      this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData)=> {
        this.user = userData;
      });
    }
    googleLogin(){
      this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=> {
        this.user = userData;
      });
    }

    signOut(): void {
      this.socialAuthService.signOut();
    }

    doLogin(){
     let  response =  this.service.login(this.username,this.password);
     response.subscribe(data => {
       this._router.navigate(["/home"])
     })
    }

}
