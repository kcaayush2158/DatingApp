import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-switch-gender',
  templateUrl: './switch-gender.component.html',
  styleUrls: ['./switch-gender.component.scss']
})
export class SwitchGenderComponent implements OnInit {

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
    const gender = this.switchGender(this.authenticatedUser.aboutMe.gender);
    const url = this.baseurl+'/user/switch-gender?gender='+gender;
    this.httpClient.get(url).subscribe((data)=>{
      this.users=data;

      this.shimmer = false;
      console.log(data);

    })
  }

  counter(i: number) {
    return new Array(i);
  }


  switchGender(gender:string){
    if(gender == 'Male'){
      return gender  = 'Female';
    }else{
       return  gender ='Male';
    }
  }
}
