import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
// search module
import { Chatroom } from 'src/app/user';
import { LocalStorageService } from 'ngx-webstorage';
import { ToastrService } from 'ngx-toastr';
import { interval } from 'rxjs/internal/observable/interval';
import { startWith } from 'rxjs/operators';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.scss'],
})
export class RoomsComponent implements OnInit {
  chatRoomId: number;
  currentItem;
  loadShoutOut: any = [];
  myRoomsCount: string;
  currentMsgToChild1 = '';
  allRoomsCount: any;
  createRoomForm: FormGroup;

  room = new Chatroom();
  $loading = new BehaviorSubject('');
  createChatrom: any = [];
  authenticatedUser: any = [];

  notEmptyPost = true;
  notscrolly = true;
  term = '';

  //charecter counters
  @Input()
  maxNumberOfCharacters = 255;
  numberOfCharacters1 = 0;
  numberOfCharacters2 = 0;
  message = {
    textValue: '',
  };

  shimmer: boolean = false;

  baseurl = 'https://lovecupid.herokuapp.com/api';

  // baseurl='http://localhost:8081/api';
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private forms: FormsModule,
    private toaster: ToastrService,
    private spinner: NgxSpinnerService,
    private toastr: ToastrService,
    private route: Router,
    private activatedRouter: ActivatedRoute,
    private localStorage: LocalStorageService
  ) {}

  counter(i: number) {
    return new Array(i);
  }

  ngOnInit() {
    this.route.navigate(['/rooms/all-rooms']);
    this.authenticatedUser = this.localStorage.retrieve('user');
    this.loadShoutOuts();
  }

  onModelChange(textValue: string): void {
    this.numberOfCharacters2 = textValue.length;
  }

  onActivate(componentReference) {
    console.log(componentReference);
    componentReference.anyFunction();
  }

  loadShoutOuts() {
    this.shimmer = true;
    const url = this.baseurl + '/chatrooms/shoutout/all';
    interval(5000)
      .pipe(
        startWith(0),
        switchMap(() => this.http.get(url, { responseType: 'json' }))
      )
      .subscribe(res => {
        this.loadShoutOut = res;
        this.shimmer = false;
      });
  }

  onScroll() {}

  createShoutOuts() {
    const url = this.baseurl + '/chatrooms/shoutout/save?email=' + this.authenticatedUser.email + '&message=' + this.message.textValue;
    this.http.post(url, {}).subscribe(
      data => {
        this.toaster.success('success', 'Shout Out done');
        this.loadShoutOuts();
      },
      err => {
        this.toaster.error('Unable to shoutout');
      }
    );
  }

  deleteShoutout(id: number) {
    this.spinner.show();
    const url = this.baseurl + '/chatrooms/shoutout/delete?id=' + id;
    this.http.post(url, {}).subscribe(
      data => {
        this.spinner.hide();
        this.toastr.success('successs', 'Message deleted');
        this.loadShoutOuts();
      },
      err => {
        this.toaster.error('Unable to delete Shoutout');
      }
    );
  }
}
