import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.scss']
})
export class ChatsComponent implements OnInit {
  users:any=[];
  message= '';

  baseurl = 'https://lovecupid.herokuapp.com/api';
  authenticatedUser:any;
  roomId:any;
  shimmer: boolean = false;


  @ViewChild('scrollMe') private myScrollContainer: ElementRef;
  
  constructor(private localStorage: LocalStorageService,private toastr:ToastrService, private activatedRoute :ActivatedRoute,private spinner: NgxSpinnerService,private router :Router,private httpClient :HttpClient) { }



  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) {}
  }
  counter(i: number) {
    return new Array(i);
  }

  ngOnInit(): void {
   
    this.authenticatedUser= this.localStorage.retrieve('user');
    this.activatedRoute.params.subscribe((data)=>{
      this.roomId = this.activatedRoute.snapshot.paramMap.get('roomId');
      this.loadMessage();
    })
  }

  sendMessage(){
    const data ={
      'message':this.message,
      'email':this.authenticatedUser.email
    }
    const url = this.baseurl+'/chatroom/public/'+this.roomId+'/save?message='+this.message+'&email='+this.authenticatedUser.email;
    this.httpClient.post(url,{})
    .subscribe((data)=>{
      this.toastr.success('success','Message Send');
  
    },(error)=>{
      this.toastr.error('failed','Unable to send message');
      this.spinner.hide();
    })
  }



  loadMessage(){
    this.shimmer = true;
    const data ={
      'email':this.authenticatedUser.email
    }
    const url = this.baseurl+'/chatroom/public/'+this.roomId+'/all?email='+this.authenticatedUser.email;
    interval(4000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.httpClient.get(url))
      )
      .subscribe(res => {
        this.shimmer = false;
        this.users = res;

       },(error)=>{
        this.toastr.error('failed','Unable to send message');
      })  ;
  }
}
