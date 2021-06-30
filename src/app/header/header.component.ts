import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { AppService } from '../app.service';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Options } from '@angular-slider/ngx-slider';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  countNotification: string;
  _loadNotification = [];
  userNotification: any = [];
  search: any = [];
  loading$ = new BehaviorSubject('');
  user: any = [];
  baseurl = 'https://lovecupid.herokuapp.com/api';
  shimmer: boolean = false;
  searchForm: FormGroup;
  submitted = false;
  fromAge: number = 18;
  toAge: number = 80;

  options: Options = {
    floor: 0,
    ceil: 100,
  };

  get searchUserForm() {
    return this.searchForm.controls;
  }

  get gender() {
    return this.searchForm.get('gender');
  }

  get country() {
    return this.searchForm.get('country');
  }

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService,
    private app: AppService,
    private localStorage: LocalStorageService,
    private spinner: NgxSpinnerService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.user = this.localStorage.retrieve('user');
    this.loadCountNotification();

    this.searchForm = this.formBuilder.group({
      country: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
    });
  }

  authenticated() {
    if (this.localStorage.retrieve('user') != null) {
      return true;
    } else {
      return false;
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  loadNotification() {
    this.shimmer = true;
    const user = this.localStorage.retrieve('user');
    this.http.get(this.baseurl + `/notification/all?email=` + user.email, { responseType: 'json' }).subscribe(data => {
      this.userNotification = data;

      for (let i = 0; i <= this.userNotification.length; i++) {
        const $url = this.baseurl + '/notification/read/' + this.userNotification[i].id + '?email=' + user.email;
        this.http.post($url, {}).subscribe(() => {
          this.loadCountNotification();
          this.shimmer = false;
        });
        
      }
    });
  }

  loadCountNotification() {
    const $url = this.baseurl + `/count/notification?email=` + this.user.email ;
    this.http.get($url, { responseType: 'text' }).subscribe(data => {
      this.countNotification = data;
    });
  }

  searchUser() {
    const url = this.baseurl + '/search/user';
    const countUserUrl = this.baseurl + '/search/user/count';

    const params = new HttpParams()
      .set('country', this.country.value)
      .set('fromAge', this.fromAge)
      .set('toAge', this.toAge)
      .set('gender', this.gender.value);

    this.submitted = true;
    if (this.searchForm.valid) {
      this.http.get(countUserUrl, { params }).subscribe(data => {
        this.userService.setData(data);
        console.log(data);
      });

      this.http.get(url, { params }).subscribe(
        data => {
          this.toastr.success('success');
          this.userService.setUser(data);
          console.log('total user ' + data);
          console.log(data);
          this.router.navigate(['/home/profiles/search']);
        },
        err => {
          this.toastr.error('Network Error ');
        }
      );
    }
  }
}
