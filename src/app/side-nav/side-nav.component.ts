import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../app.service';

import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss'],
})
export class SideNavComponent implements OnInit {
  constructor(private app: AppService, private http: HttpClient, private router: Router, private localStorage: LocalStorageService) {}
  ngOnInit(): void {}
  logout() {
    this.localStorage.clear('user');
    this.localStorage.clear('isLoggedIn');
    this.router.navigate(['login']);
  }
}
