import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-you-like',
  templateUrl: './you-like.component.html',
  styleUrls: ['./you-like.component.scss']
})
export class YouLikeComponent implements OnInit {
  users: any = [];
  baseurl='https://lovecupid.herokuapp.com/api';
  shimmer : boolean=false;
  
  constructor(private router: Router, private localStorage: LocalStorageService, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.loadYouLikeProfiles();
  }

  counter(i: number) {
    return new Array(i);
}

  loadYouLikeProfiles() {
    const principal = this.localStorage.retrieve('user');
    this.shimmer=true;
    const url = this.baseurl+'/v1/likes/u/all?email=' + principal.email;
    this.httpClient.get(url, { responseType: 'json' }).subscribe((data) => {
      this.users = data;
      this.shimmer=false;
    });

  }
}
