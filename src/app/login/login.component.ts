import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../app.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  private loggedIn: boolean;
  users = User;
  messageResponse = '';
  credentials = { email: '', password: '' };
  recoveryemail: string;
  loginForm: FormGroup;
  authenciate = false;
  onlineUsers = [];
  baseurl = 'https://lovecupid.herokuapp.com/api';

  constructor(
    private app: AppService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private activatedRoute: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _httpClient: HttpClient,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.spinner.show();
    if (this.localStorage.retrieve('isLoggedIn') == true) {
      this.activatedRoute.params.subscribe(data => {
        this.spinner.hide();
        this.toastr.success('success', 'Login Successful');
        this._router.navigateByUrl['/home'];
      });
    }
  }

  authenticated() {
    return this.authenciate;
  }

  login() {
    const params = new HttpParams();
    params.set('email', this.credentials.email);
    params.set('password', this.credentials.password);

    const url = this.baseurl + '/user/login?email=' + this.credentials.email + '&password=' + this.credentials.password;
    this._httpClient.get(url).subscribe(
      response => {
        if (response) {
          this.localStorage.store('user', response);
          this.localStorage.store('isLoggedIn', 'true');
          this.authenciate = true;
          this.messageResponse = 'success';
          this.toastr.success('success', 'Login successful');
          this.onlineUsers.push(response);
          this._router.navigateByUrl('/home/profiles');
        } else {
        
          this.messageResponse = 'Bad credentials';
          this.authenciate = false;
          this._router.navigateByUrl('/login');
        }
      },
      (err) => this.toastr.error('error', 'invalid credentials')

      // // for social-login
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
      //   this.localStorage.clear('user');
      // }
    );
  }
}

