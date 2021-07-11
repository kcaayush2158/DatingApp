import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import { BehaviorSubject, Subscription } from 'rxjs';
import { interval } from 'rxjs';
import { startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  user: any;
  users: any = [];
  userId;
  roomId;
  timeInterval: Subscription;

  username = '';
  privateMessages: any = [];
  authenticatedUser;

  loading$ = new BehaviorSubject('');
  public show = false;
  public buttonName: any = 'Show';

  search: any;
  message = '';

  id: any;

  baseurl = 'https://lovecupid.herokuapp.com/api';
  public enableChatBox = false;
  shimmer = false;

  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  // tslint:disable-next-line: max-line-length
  constructor(
    private http: HttpClient,
    private activatedRouter: ActivatedRoute,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private route: Router,
    private localStorage: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.user = this.localStorage.retrieve('user');

    this.authenticatedUser = this.user.username;
    console.log(this.user.username);
    this.loadMessage();
    this.showChatBox();
    this.scrollToBottom();
  }

  // tslint:disable-next-line:use-lifecycle-interface
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

  loadMessage() {
    this.shimmer = true;
    this.user = this.localStorage.retrieve('user');

    const url = this.baseurl + '/direct/inbox?email=' + this.user.email;

    this.timeInterval = interval(1000)
      .pipe(
        startWith(0),
        switchMap(() => this.http.get(url, { observe: 'response' }))
      )
      .subscribe(
        data => {
          console.log('1');
          this.users = data;
          this.shimmer = false;
          console.log('message loading');
          this.loadPrivateMessages(this.id, this.users.conversation.roomId);
        },
        err => {
          this.toastr.error('failed', 'Unable to send message');
        }
      );
  }

  showChatBox() {
    // this.id$ = this.activatedRouter.paramMap.pipe(map(paramMap => paramMap.get('id')));
    this.show = !this.show;
    this.activatedRouter.params.subscribe(data => {
      this.id = this.activatedRouter.snapshot.paramMap.get('id');
      this.roomId = this.activatedRouter.snapshot.paramMap.get('roomId');
      this.loadPrivateMessages(this.id, this.roomId);
    });
  }

  loadPrivateMessages(userid: number, uuid: any) {
    const url = this.baseurl + '/direct/all?userId=' + this.id + '&email=' + this.user.email + '&uuid=' + uuid;
    this.http.get(url, { responseType: 'json' }).subscribe(data => {
      this.privateMessages = data;
      console.log(this.privateMessages);
    });
  }

  sendPrivateMessage() {
    const data = {
      message: this.message,
      roomId: this.roomId,
      email: this.user.email,
    };

    const url =
      this.baseurl + '/direct/u/' + this.id + '/send?message=' + this.message + '&email=' + this.user.email + '&roomId=' + this.roomId;

    this.http.post(url, {}).subscribe(
      () => {
        this.toastr.success('success', 'Message send ');
        this.loadPrivateMessages(this.id, this.roomId);
      },
      err => this.toastr.error('error', 'Unable to send message')
    );
  }

  deleteUser(id: number) {
    // const data = {
    //   this.id: id,
    // };
    const url = this.baseurl + '/private/user/delete?id=' + id + '&email=' + this.user.email;
    this.shimmer = true;
    this.http.post(url, {}).subscribe(
      () => {
        this.shimmer = false;
        this.loadMessage();
      },
      err => {
        this.toastr.error('error', 'Unable to delete message');
        this.spinner.hide();
      }
    );
  }

  deleteUserMessage(id: number) {
    const params = new HttpParams();
    params.set('id', id);
    params.set('email', this.user.email);

    const url = this.baseurl + '/private/message/delete?id=' + id + '&email=' + this.user.email;
    this.shimmer = true;
    this.http.post(url, {}).subscribe(
      () => {
        this.shimmer = false;
        this.showChatBox();
      },
      err => {
        this.toastr.error('error', 'Unable to delete message');
        this.spinner.hide();
      }
    );
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy(): void {
    this.timeInterval.unsubscribe();
  }
}
