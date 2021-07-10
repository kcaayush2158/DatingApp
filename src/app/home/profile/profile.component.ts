import { HttpClient, HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxFileUploadStorage, NgxFileUploadOptions, NgxFileUploadRequest } from '@ngx-file-upload/core';
import { Gallery } from 'angular-gallery';
import { EventEmitter } from 'events';

import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';
import SwiperCore, { EffectCoverflow, Pagination } from 'swiper/core';

// install Swiper modules
SwiperCore.use([EffectCoverflow, Pagination]);
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit {
  photos: any = [];
  user;
  images = [];
  totalLikes;
  topicQuestion = '';
  topicAnswer = '';
  totalLike;
  interest ;
  interests:any=[];
  userForm: FormGroup;

  public uploads: NgxFileUploadRequest[] = [];
  private storage: NgxFileUploadStorage;
  private uploadOptions: NgxFileUploadOptions;

  @Input() formTopic: FormGroup;
  @Output() formChange: EventEmitter = new EventEmitter();

  topicName = '';
  topics: any = [];
  baseurl = 'https://lovecupid.herokuapp.com/api';

  get registerFormControl() {
    return this.userForm.controls;
  }
  get firstname() {
    return this.userForm.get('firstname');
  }
  get lastname() {
    return this.userForm.get('lastname');
  }
  get bio() {
    return this.userForm.get('bio');
  }
  get username() {
    return this.userForm.get('username');
  }

  get password() {
    return this.userForm.get('password');
  }

  get email() {
    return this.userForm.get('email');
  }

  get relationship() {
    return this.userForm.get('relationship');
  }
  get known() {
    return this.userForm.get('known');
  }
  get workAs() {
    return this.userForm.get('workAs');
  }
  get lookingFor() {
    return this.userForm.get('lookingFor');
  }
  get haveKids() {
    return this.userForm.get('haveKids');
  }
  get height() {
    return this.userForm.get('height');
  }
  get smoke() {
    return this.userForm.get('smoke');
  }
  get drink() {
    return this.userForm.get('drink');
  }
  get languages() {
    return this.userForm.get('languages');
  }
  get hair() {
    return this.userForm.get('hair');
  }
  get repassword() {
    return this.userForm.get('repassword');
  }
  get eyes() {
    return this.userForm.get('eyes');
  }
  get occupation() {
    return this.userForm.get('occupation');
  }

  get liveIn() {
    return this.userForm.get('liveIn');
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: true,
  };

  // tslint:disable-next-line: max-line-length
  constructor(
    private gallery: Gallery,
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private toastr: ToastrService,
    private spinner: NgxSpinnerService,
    private localStorage: LocalStorageService
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      gender: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      education: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      country: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      bio: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      firstname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      bodyType: ['', [Validators.required]],
      height: ['', [Validators.required]],
      eyes: ['', [Validators.required]],
      hair: ['', [Validators.required]],
      interests: ['', [Validators.required]],
      liveIn: ['', [Validators.required]],
      occupation: ['', [Validators.required]],
      age: ['', [Validators.required]],
      languages: ['', [Validators.required]],
      relationship: ['', [Validators.required]],
      known: ['', [Validators.required]],
      workAs: ['', [Validators.required]],
      lookingFor: ['', [Validators.required, Validators.minLength(40), Validators.maxLength(300)]],
      haveKids: ['', [Validators.required]],
      smoke: ['', [Validators.required]],
      drink: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    });
  }

  ngOnInit() {
    this.user = this.localStorage.retrieve('user');
    this.loadTopic();
    this.loadAuthenticatedUserPhotos();
    this.loadInterest();

    // this.formChange.emit(this.formTopic)

    // this.formTopic = this.formBuilder.group({
    //   topicName: ['', [Validators.required] ],
    //   topicQuestion : ['', [Validators.required,]],
    //   topicAnswer: ['', [Validators.required, Validators.minLength(100), Validators.maxLength(250)]],
    // });


  }

  countLikes(likes: any) {
    this.totalLikes = likes;
  }

  loadAuthenticatedUserPhotos() {
    const url = this.baseurl + '/principal/user/photo?email=' + this.user.email;
    this.http.get(url).subscribe(
      data => {
        this.photos = data;
      },
      err => {
        this.toastr.error('Network Error');
      }
    );
  }

  saveInterest(interest:string){
    const params = new HttpParams();
    params.set('email',this.user.email);
    params.set('interest',this.interest);

    const url = this.baseurl + '/interest/save?email='+this.user.email+'&interest='+interest;
    this.http.post(url,{}).subscribe(
      data => {
        this.toastr.success('Interest Added');
        this.loadInterest();
      },
      err => {
        this.toastr.error('Intrest Already Existed');
      }
    );

  }

  loadInterest(){
    const params = new HttpParams();
    params.set('email',this.user.email);


    const url = this.baseurl + '/interest/all?email='+this.user.email;
    this.http.get(url,{params}).subscribe(
      data => {
        this.interests = data;
      },
      err => {
        this.toastr.error('Network Error');
      }
    );
  }

  deleteInterest(id:number){
    const url = this.baseurl + '/interest/delete?id='+id+'&email='+this.user.email;
    this.http.post(url,{}).subscribe(
      (data) => {
        this.toastr.success('Item deleted');
        this.loadInterest();
      },
      err => {
        this.toastr.error('Network Error');
      }
    );
  }

  showGallery(index: number, picture: any) {
    const prop = {
      images: [{ path: picture }],
      index,
    };
    this.gallery.load(prop);
  }

  // deletePhoto(id:number){

  //   const url = this.baseUrl+'/photos/'+id +'/delete?email='+this.user.email;
  //   this.http.get(url).subscribe((data)=>{
  //     this.spinner.hide();
  //     this.photos = data;
  //   });
  // }
  saveUser() {
    const url = this.baseurl + '/aboutme/save?';
  }


  loadTopic() {
    this.http.get(this.baseurl + '/topic/all?id=' + this.user.id, { responseType: 'json' }).subscribe(data => {
      this.topics = data;
    });
  }

  saveTopic() {
    this.http
      .post(
        this.baseurl +
          '/topic/save?id=' +
          this.user.id +
          '&topicName=' +
          this.topicName +
          '&topicQuestion=' +
          this.topicQuestion +
          '&topicAnswer=' +
          this.topicAnswer,
        {}
      )
      .subscribe(
        data => {
          console.log(data);
          this.toastr.success('success', 'Topic added');
          this.loadTopic();
        },
        err => {
          this.toastr.error('error', 'Topic Already existed');
        }
      );
  }

  deleteTopic(id: number) {
    const params = new HttpParams();
    params.set('id',id);
    this.http.delete(this.baseurl + '/topic/delete', {params}).subscribe(data => {
      this.toastr.success('success', 'Topic deleted successfully');
      this.loadTopic();
    });
  }

  sendMessage(id: number) {
    const params = new HttpParams();
    params.set('id',id);
    const url = this.baseurl + '/v1/likes/save';
    this.http.post(url, {params}).subscribe(
      data => {
        this.toastr.success('success', 'Intro has been sent successfully');
        const countlikeUrl = this.baseurl + '/v1/likes/users/count';
        this.http.get(countlikeUrl).subscribe(response => {
          this.toastr.success('sucess', '');
        });
      },
      error => this.toastr.error('unbale to send message')
    );
  }

  sendLike(id: number) {
    const url = this.baseurl + '/direct/inbox/user/' + id + '/send';
    this.http.post(url, {}).subscribe(data => {
      this.toastr.success('success', 'Intro has been sent successfully');
    });
  }
}
