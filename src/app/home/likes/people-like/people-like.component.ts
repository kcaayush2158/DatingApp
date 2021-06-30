import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-people-like',
  templateUrl: './people-like.component.html',
  styleUrls: ['./people-like.component.scss']
})
export class PeopleLikeComponent implements OnInit {


  likes:any=[];
  user :any =[]
  baseurl='https://lovecupid.herokuapp.com/api';
  shimmer : boolean=false;
  constructor(private http:HttpClient,private localStorage:LocalStorageService,private spinner :NgxSpinnerService) { }

  ngOnInit(): void {
    this.loadVisits();

  }
  counter(i: number) {
    return new Array(i);
}

  loadVisits(){
  this.user= this.localStorage.retrieve("user");
  this.shimmer=true;
    var url =this.baseurl+"/v1/likes/all?email="+this.user.email;
    this.http.get(url,{responseType: 'json'}).subscribe((data)=>{
      this.likes=data;
      this.shimmer=false;
      
    });
  

  }


}