import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';

import { concatMap, map, switchMap, filter, take, startWith } from 'rxjs/operators';
import { timer, BehaviorSubject, Observable, interval } from 'rxjs';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  notEmptyPost = true;
  notScrolly = true;
  onlineUsers: any;
  countNotifications: number;
  // users:any ;
  notification: any;
  loading$ = new BehaviorSubject('');
  baseurl = 'https://lovecupid.herokuapp.com/api';

  constructor(private http: HttpClient, private toastr: ToastrService, private spinner: NgxSpinnerService, private router: Router, private localStorage: LocalStorageService) { }

  ngOnInit() {
    this.countNotification();
    this.loadOnlineUsers();
    this.router.navigate(['/home/profiles']);

  }

  countNotification() {

    const url = this.baseurl + '/count/users/online';
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.http.get(url)
        )
      ).subscribe(
        (data: any) => { console.log(data); this.countNotification = data }
        , (err) => { this.toastr.error('Network Error') });

  }



  loadOnlineUsers() {

    const url = this.baseurl + '/count/users/online';
    interval(10000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.http.get(url, { responseType: 'text' })
        )
      ).subscribe(
        (data) => {
          this.onlineUsers = data;
        },
      ), (err) => { this.toastr.error('Network Error') };

  }

}
