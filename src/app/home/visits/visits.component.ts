import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { VisitedUsers } from './visited-user';
import { LocalStorageService } from 'ngx-webstorage';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-visits',
  templateUrl: './visits.component.html',
  styleUrls: ['./visits.component.scss']
})
export class VisitsComponent implements OnInit {
 visits:any=[];
 user:any=[];
 visitsCount :string ;
 shimmer : boolean=false;
 
 baseurl='https://lovecupid.herokuapp.com/api';
  constructor(private http:HttpClient,private spinner :NgxSpinnerService ,private toastr:ToastrService,private localStorage:LocalStorageService) { }

  ngOnInit(): void {
    this.loadVisits();
    this.countVisits();
    this.user = this.localStorage.retrieve('user');
  }
  counter(i: number) {
    return new Array(i);
}

  loadVisits(){
    this.user = this.localStorage.retrieve('user');
    this.spinner.show();
    var url = this.baseurl+"/v1/visits?email="+this.user.email;
    this.shimmer=true;
    this.http.get(url,{responseType: 'json'}).subscribe((data)=>{
      this.visits=data;
      this.shimmer=false;
      this.spinner.hide();
      
    },(err)=>{this.toastr.error('Network Error')});;
  
  }

  countVisits(){
    
    var url =this.baseurl+"/v1/visits/users/count?email="+this.user.email;
    this.http.get(url,{responseType: 'text'}).subscribe((data)=>{
      this.visitsCount=data;
    }),(err)=>{this.toastr.error('Network Error')};
  }

}
