import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, timer } from 'rxjs';
import { switchMap, concatMap, map, filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/user.service';
@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.scss'],
})
export class ProfilesComponent implements OnInit {
  notEmptyPost = true;
  notScrolly = true;
  onlineUsers: any;
  users;
  notification: any;
  loading$ = new BehaviorSubject('');
  onlineEvent: Observable<Event>;
  offlineEvent: Observable<Event>;
  subscriptions: Subscription[] = [];
  username;
  searchUser :boolean =false;
  searchedUser:boolean;

  baseurl = 'https://lovecupid.herokuapp.com/api';
  constructor(
    private http: HttpClient,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService
  ) {}
  shimmer: boolean = false;
  ngOnInit() {
    // this.loadAllProfiles();
    this.loadOnlineUsers();
    this.loadAllProfiles();

    
  }



  counter(i: number) {
    return new Array(i);
  }

  loadAllProfiles() {
    const url = this.baseurl + '/user/all';
    this.shimmer = true;
    this.http.get(url, { responseType: 'json' }).subscribe(data => {
      this.users = data;
      this.shimmer = false;
      this.spinner.hide();
    });
  }



  loadOnlineUsers() {
    const url$ = this.http.get(this.baseurl + '/count/users/online');

    this.loading$
      .pipe(
        switchMap(_ =>
          timer(30000)
            .pipe(
              concatMap(_ => url$),
              map((response: any) => {
                this.onlineUsers = response;
                return response;
              })
            )
            .pipe(filter(data => data.generated === true))
            .pipe(take(1))
        )
      )
      .subscribe(
        (data: any) => {
     
          this.onlineUsers = data;
        },
        err => {
          this.toastr.error('Network Error');
        }
      );
  }
}
