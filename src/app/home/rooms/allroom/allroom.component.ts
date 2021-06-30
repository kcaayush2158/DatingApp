import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, interval, timer } from 'rxjs';
import { concatMap, filter, map, switchMap, take } from 'rxjs/operators';
import { startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-allroom',
  templateUrl: './allroom.component.html',
  styleUrls: ['./allroom.component.scss']
})

export class AllroomComponent implements OnInit {
  @Input() searchText = '';

  allRooms: any = [];
  allRoomsCount;
  myRoomsCount: string;
  $loading = new BehaviorSubject('');
  text: any;
  createRoomForm: FormGroup;
  baseurl = 'https://lovecupid.herokuapp.com/api';
  shimmer : boolean=false;
  authenticatedUser;



  get registerFormControl() {
    return this.createRoomForm.controls;
  }


  get chatRoomName() {
    return this.createRoomForm.get('chatRoomName');
  }

  get roomDescription() {
    return this.createRoomForm.get('roomDescription');
  }

  get roomType() {
    return this.createRoomForm.get('roomType');
  }

  get password() {
    return this.createRoomForm.get('password');
  }


  ngOnInit(): void {
    this.authenticatedUser = this.localStorage.retrieve('user');
    this.loadChatRooms();
  }

  counter(i: number) {
    return new Array(i);
}

  constructor(private http: HttpClient, private localStorage: LocalStorageService, private spinner: NgxSpinnerService, private toastr: ToastrService, private formBuilder: FormBuilder) {

    this.createRoomForm = this.formBuilder.group({
      chatRoomName: ['', [Validators.required, Validators.minLength(5), Validators.required, Validators.maxLength(20)]],
      roomDescription: ['', [Validators.required, Validators.minLength(20), Validators.required, Validators.maxLength(100)]],
      roomType: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5), Validators.required, Validators.maxLength(20)]],
    });

  }

  onActivate(componentReference) {
    console.log(componentReference)
    componentReference.anyFunction();
  }


  createChatroom() {
    const url = this.baseurl + '/chatroom/create?chatRoomName=' + this.chatRoomName.value + '&roomDescription=' + this.roomDescription.value + '&roomType=' + this.roomType.value + '&password=' + this.password.value + '&email=' + this.authenticatedUser.email;
    const headers = { 'content-type': 'application/json' }
    this.spinner.show();
    this.http.post(url, { headers })
      .subscribe((data) => {
        this.loadChatRooms();
        this.spinner.hide();
      } ,(err)=>{this.toastr.error('Network Error')});
  }

  loadChatRooms() {
 
    this.shimmer=true;
    const url = this.baseurl + '/chatrooms/all';
    interval(20000)
      .pipe(
        startWith(0),
        switchMap(() =>
          this.http.get(url, { responseType: 'json' })
        )
      ).subscribe((data) => {
        this.shimmer=false;
        this.allRooms = data;
        this.countMyRoom();
    

      }, (err) => {
        this.toastr.error('error', 'Unable to load room');
      });
  }

  countMyRoom() {
    const url = this.baseurl + '/chatroom/my/count?email=' + this.authenticatedUser.email;
    this.http.get(url, { responseType: 'text' })
      .subscribe((data) => {
        this.myRoomsCount = data;
      }, (err) => {
        this.toastr.error('Unable to load myroom');
      });

  }

}

