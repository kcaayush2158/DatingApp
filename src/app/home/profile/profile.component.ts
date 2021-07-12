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

  get age() {
    return this.userForm.get('age');
  }

  get country() {
    return this.userForm.get('country');
  }
  get gender() {

    return this.userForm.get('gender');
  }
  get bodyType() {
    return this.userForm.get('bodyType');
  }

  get education() {
    return this.userForm.get('education');
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
      firstname:  ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)] )],
      lastname:   ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      username:   ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(20)])],
      email:   ['', Validators.compose([Validators.required, Validators.email])],
      bodyType:  ['', Validators.required ],
      height:['', Validators.compose([Validators.required])],
      eyes:  ['', Validators.required ],
      gender:   ['', Validators.required ],
      hair:  ['', Validators.required ],
      interests:  ['', Validators.required ],
      languages:  ['', Validators.required ],
      relationship:  ['', Validators.required ],
      country:   ['', Validators.required ],
      known:   ['', Validators.compose([Validators.required])],
      workAs:   ['', Validators.required ],
      lookingFor:  ['', Validators.required ],
      liveIn:  ['', Validators.required ],
      bio:  ['', Validators.compose([Validators.required, Validators.minLength(200), Validators.maxLength(1800)])],
      haveKids:  ['', Validators.required ],
      age:  ['', Validators.compose([Validators.required])],
      smoke :  ['', Validators.required ],
      drink : ['', Validators.required ],
      education : ['', Validators.required ],
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


  updateUser() {

    const url= this.baseurl+'/user/update?email='+this.email.value+
    '&drink='+this.drink.value+
    '&smoke='+this.smoke.value+
    '&haveKids='+this.haveKids.value+
    '&bio='+this.bio.value+
    '&lookingFor='+this.lookingFor.value+
    '&workAs='+this.workAs.value+
    '&relationship='+this.relationship.value+
    '&password='+this.password.value+
    '&hair='+this.hair.value+
    '&age='+this.age.value+
    '&liveIn='+this.liveIn.value+
    '&known='+this.known.value+
    '&eyes='+this.eyes.value+
    '&country='+this.country.value+
    '&gender='+this.gender.value+
    '&bodyType='+this.bodyType.value+
    '&education='+this.education.value+
    '&height='+this.height.value+
    '&interests='+this.interests.value+
    '&lastName='+this.lastname.value+
    '&username='+this.username.value+
    '&firstName='+this.firstname.value+
    '&languages='+this.languages.value;

        this.http.post(url,{}).subscribe(data => {
          this.toastr.success('Signup complete');

        },(err)=>{this.toastr.error('failed');});

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
    const url = this.baseurl + '/user/save';
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
