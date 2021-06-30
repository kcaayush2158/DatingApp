import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {

  user: any;
  baseurl='https://lovecupid.herokuapp.com/api';
  photos: any;

  constructor(private spinner :NgxSpinnerService,private httpClient:HttpClient) { }

  ngOnInit(): void {
  }


  

  loadPhotos(){
    this.spinner.show();
   
    var url = this.baseurl+"/principal/user/photo?email="+this.user.email;
    this.httpClient.get(url).subscribe((data)=>{
      this.photos=data;
      console.log(data);
      this.spinner.hide();
    })


  }



}
