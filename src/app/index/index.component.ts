import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { Usersearch,User } from '../user';
// import{AuthService,SocialUser,GoogleLoginProvider,FacebookLoginProvider} from 'ng4-social-login';
import { UserService } from '../user.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  
  title = 'Dating';
  sex=['Male','Female'];
  validateGenders= true; //gender validator for the select menu
  _userSearchModel = new Usersearch('','default',18,80);



  private loggedIn :boolean;

  //socail login 
  constructor(private _userService : UserService,private router:Router,private localStorage:LocalStorageService){}
  ngOnInit(): void {
    let existedUser = this.localStorage.retrieve('user');
    if(existedUser!=null){
  
      this.router.navigateByUrl('/home');
      console.log("user exists");
      console.log(this.localStorage.retrieve('user'));
    }else{
      console.log("user does not exists");
      console.log(this.localStorage.retrieve('user'));
    }
  }



    // facebookLogin(){
    //   this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID).then((userData)=> {
    //     this.user = userData;
    //   });
    // }
    // googleLogin(){
    //   this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID).then((userData)=> {
    //     this.user = userData;
    //   });
    // }

    // signOut(): void {
    //   this.socialAuthService.signOut();
    // }
    
 //for validating the  select box for gender
validateGender(value){
  if(value ==='default'){
    this.validateGenders= true;
  }else{
      this.validateGenders=false;
  }
}

}
