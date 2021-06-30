
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, timer } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, concatMap, map, filter, take } from 'rxjs/operators';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { Chatroom } from 'src/app/user';
@Component({
  selector: 'app-myroom',
  templateUrl: './myroom.component.html',
  styleUrls: ['./myroom.component.scss']
})
export class MyroomComponent implements OnInit {
  chatRoomId: string;
  chatroom = new Chatroom();
  myRooms: any = [];
  user: any = [];
  myRoomsCount: string;
  $loading = new BehaviorSubject('');
  text: any;
  shimmer : boolean=false;
  baseurl = 'https://lovecupid.herokuapp.com/api';
  constructor(private http: HttpClient, private activatedRouter: ActivatedRoute, private toastr: ToastrService, private spinner: NgxSpinnerService, private route: Router, private localStorage: LocalStorageService) { }

  ngOnInit(): void {

    this.user = this.localStorage.retrieve("user");

    this.loadMyChatRooms();
    this.chatRoomId = this.activatedRouter.snapshot["chatRoomId"];
  }

  counter(i: number) {
    return new Array(i);
}
  loadMyChatRooms() {
    this.shimmer=true;
    this.user = this.localStorage.retrieve("user");
    const url = this.baseurl + '/my/chatroom?email=' + this.user.email;
    this.http.get(url, { responseType: 'json' })
      .subscribe((data) => {
        this.myRooms = data;
        this.shimmer=false;
        this.countMyRoom();

      }, (err) => {
        this.toastr.error('error', 'Unable to load room');
      });
  }

  deleteChatRoom(id: number) {
    var url = this.baseurl + "/chatroom/" + id + "/delete";
    this.spinner.show();
    this.http.post(url, {}).subscribe((data) => {
      if (data == 1) {
        this.toastr.success('success', 'Chat room is deleted successfully');
        this.loadMyChatRooms();
      } else {
        this.toastr.error('error', 'Unable to delete the Chat Room');
      }
      this.spinner.hide();

    },(err)=>{this.toastr.error('Network Error')});
  }


  countMyRoom() {
    const user = this.localStorage.retrieve('user');
    const url = this.http.get(this.baseurl + '/chatroom/my/count?email=' + user.email, { responseType: 'text' });
    console.log(url);
    this.$loading.pipe(
      switchMap(_ => timer(0, 10000).pipe(
        concatMap(_ => url),
        map((response: any) => {
          this.myRoomsCount = response;
          return response;
        })
      ).pipe(filter(data => data.generated == true))
        .pipe(take(1))
      )).subscribe((data) => {

        this.myRoomsCount = data;
      },(err)=>{this.toastr.error('Network Error')});

  }

}

