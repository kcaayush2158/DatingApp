import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { LocalStorageService } from 'ngx-webstorage';
import { EventEmmitterService } from '../profile/event-emmitter.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.scss']
})
export class LikesComponent implements OnInit {


  likes:any=[];
  user :any =[]
  countYouLike :string;
  countlikedYou:string;
  baseurl='https://lovecupid.herokuapp.com/api';
  // tslint:disable-next-line:max-line-length
  constructor(private http:HttpClient,private eventEmitter: EventEmmitterService, private localStorage:LocalStorageService,private router:Router,private spinner:NgxSpinnerService) { }

  ngOnInit(): void {
    this.router.navigate(['/likes/liked-you']);
    this.loadVisits();
    this.countYourLikeProfile();
    this.countLikedYourProfile();

  }

  loadVisits(){
  this.spinner.show();
    const user= this.localStorage.retrieve('user');
    const url =this.baseurl+'/v1/likes/all?email='+user.email;
    this.http.get(url,{responseType: 'json'}).subscribe((data)=>{
      this.likes=data;

      this.spinner.show();
    });

  }

  countYourLikeProfile(){
    this.spinner.show();
    const user= this.localStorage.retrieve('user');
   const url=this.baseurl+'/v1/likes/you-liked/count?email='+user.email;
   this.http.get(url,{responseType:'text'}).subscribe((data)=>{
    this.countYouLike = data;

    this.eventEmitter.callCountLikes(data);
    this.spinner.hide();
   });
  }

 countLikedYourProfile(){
  this.spinner.show();
    const user= this.localStorage.retrieve('user');
   const url=this.baseurl+'/v1/likes/users/count?email='+user.email;
   this.http.get(url,{responseType:'text'}).subscribe((data)=>{
    this.countlikedYou = data;
    this.spinner.hide();
   });
  }



}
