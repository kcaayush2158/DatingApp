import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-user-visit',
  templateUrl: './user-visit.component.html',
  styleUrls: ['./user-visit.component.scss']
})
export class UserVisitComponent implements OnInit {

  user: any;
  topics: any = [];
  photos: any = []
  baseurl='https://lovecupid.herokuapp.com/api';
  message = '';
  navigationProfiles;

  @Input()
  maxNumberOfCharacters = 1000;
  counter = true;

  numberOfCharacters1 = 0;
  numberOfCharacters2 = 0;
  interaction = {
    textValue: ''
  };
  authenticatedUser;
  interests: any= [];

  // tslint:disable-next-line: max-line-length
  constructor(private activatedRoute: ActivatedRoute, private localStorage: LocalStorageService, private spinner: NgxSpinnerService, private http: HttpClient, private toastr: ToastrService) { }


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
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 4
      }
    },
    nav: true
  }

  onModelChange(textValue: string): void {
    this.numberOfCharacters2 = textValue.length;
  }

  ngOnInit(): void {
    this.authenticatedUser = this.localStorage.retrieve('user');
    this.activatedRoute.params.subscribe(() => {
      this.user = this.activatedRoute.snapshot.paramMap.get('string');
      this.http.get(this.baseurl + '/user/' + this.user, { responseType: 'json' }).subscribe((data) => {
        this.user = data;
        this.navigateProfile(this.user.id);
        this.loadPhotos(this.user.email);
        this.loadTopic(this.user.id);

      });
    });

  }

  loadInterest(){
    const url = this.baseurl + '/interest/all?email='+this.user.email;
    this.http.get(url).subscribe(
      data => {
        this.interests = data;
      },
      err => {
        this.toastr.error('Network Error');
      }
    );
  }

  loadPhotos(email:string) {
    this.spinner.show();
    const url = this.baseurl + '/principal/user/photo?email=' +email;
    this.http.get(url).subscribe((data) => {
      this.photos = data;
      this.spinner.hide();
    })
  }

  loadTopic(id: number) {
    this.http.get(this.baseurl + '/topic/all?id=' + this.user.id, { responseType: 'json' }).subscribe((data) => {
      this.topics = data;
      console.log('success' + this.topics);
    })
  }

  sendMessage(id: number) {
    const url = this.baseurl+'/direct/u/'+this.user.id+'/send?message='+this.message+'&email='+this.authenticatedUser.email+'&roomId=';
    this.spinner.show();
    this.http.post(url, {}).subscribe(() => {
      this.toastr.success('message is send successfully');
      this.spinner.hide();
    }, (err) => { this.toastr.error('failed to send message'); });
  }

  navigateProfile(id:number){
    const url = this.baseurl+'/profile/navigate?id='+id;
    this.http.get(url).subscribe((data)=>{
      console.log(data);
        this.navigationProfiles = data;
    });
  }

}
