import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  users :any=[]
  totalUsers:any;
  shimmer: boolean = false;
  message:string;
  constructor(private userService :UserService) { }

  ngOnInit(): void {

    this.users = this.userService.getUser();
      if(this.users == null || this.users ==0){
        this.message='Unable to found results. Please try again  ';
      }
    this.totalUsers = this.userService.getData();

    console.log('child component '+this.users);
    this.shimmer = false;
  }

  counter(i: number) {
    return new Array(i);
  }

}
