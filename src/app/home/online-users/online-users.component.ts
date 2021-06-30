import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-online-users',
  templateUrl: './online-users.component.html',
  styleUrls: ['./online-users.component.scss']
})
export class OnlineUsersComponent implements OnInit {

  users = [];
  photoes: any = [];
  baseurl = 'https://lovecupid.herokuapp.com/api';
  shimmer : boolean=false;
  constructor(private http: HttpClient, private spinner: NgxSpinnerService, private localStorage: LocalStorageService) { }

  ngOnInit(): void {


    this.loadOnlineProfiles();


  }

  counter(i: number) {
    return new Array(i);
}

  loadOnlineProfiles() {
  this.shimmer=false;

    const url = this.baseurl+'/u/online';
    this.http.get(url, { responseType: 'json' }).subscribe((data) => {
      let responseData = JSON.stringify(data);

      for (var i = 0; i <= responseData.length; i++) {
        this.http.get(this.baseurl+'/u/' + data[i].username + '/online/get', { responseType: 'json' }).subscribe((response) => {

          this.users.push(response);
          this.shimmer=true;


        });

      }

    });

  }



}
