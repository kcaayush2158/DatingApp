import { Component, OnInit } from '@angular/core';
import { UserSignup } from '../user';
import { HttpClient } from '@angular/common/http';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userSignupModel = new UserSignup('','','','','','','','');
  genderHasError= true;
  sex=['Male','Female'];
  message:any;

  constructor(private service :HttpClientService) { }

  ngOnInit() {
  }

  validateGender(value){
    if(value ==='default'){
      this.genderHasError= true;
    }else{
        this.genderHasError=false;
    }
  }
  public doSignup(){
   let response = this.service.createUser(this.userSignupModel);
    response.subscribe((data) => this.message = data);
    
  }

}
