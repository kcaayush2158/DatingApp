import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-nearby',
  templateUrl: './nearby.component.html',
  styleUrls: ['./nearby.component.scss']
})
export class NearbyComponent implements OnInit {

  users: any = [];
  authenticatedUser;
  shimmer: boolean = false;
  baseurl = 'https://lovecupid.herokuapp.com/api';

  constructor(private httpClient :HttpClient,private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.authenticatedUser = this.localStorage.retrieve('user');
    this.loadUsers();
  }

  loadUsers(){
    this.shimmer = true;
    const url = this.baseurl+'/user/own-country?country='+this.authenticatedUser.aboutMe.country;
    this.httpClient.get(url).subscribe((data)=>{
      this.users=data;
      this.shimmer = false;
      console.log('success');

    })
  }

  counter(i: number) {
    return new Array(i);
  }


}
