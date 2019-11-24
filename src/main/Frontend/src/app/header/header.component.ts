import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import{AuthService,SocialUser,GoogleLoginProvider,FacebookLoginProvider} from 'ng4-social-login';
import { User, UserLogin } from '../user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  ngOnInit(): void {
  }


   

  // onSubmit(){
  //   this._userService.enroll(this.userModel)
  //     .subscribe(
  //       data => console.log("success" ,data),
  //       error => console.log('error',error)
  //     )
  // }

}
