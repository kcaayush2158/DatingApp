import { Component, OnInit } from '@angular/core';
import { Chatroom } from '../user';
import { HttpClient } from '@angular/common/http';
import { NgWizardConfig, NgWizardService, StepChangedArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  userSignupModel = new Chatroom();
  genderHasError = true;
  sex = ['Male', 'Female'];
  submitted = false;
  message: any;
  signupForm: FormGroup;
  baseurl = 'https://lovecupid.herokuapp.com/api';

  get registerFormControl() {
    return this.signupForm.controls;
  }

  get firstname() {
    return this.signupForm.get('firstname');
  }
  get lookingFor() {
    return this.signupForm.get('lookingFor');
  }
  get lastname() {
    return this.signupForm.get('lastname');
  }
  get bio() {
    return this.signupForm.get('bio');
  }
  get username() {
    return this.signupForm.get('username');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get email() {
    return this.signupForm.get('email');
  }

  get relationship() {
    return this.signupForm.get('relationship');
  }
  get known() {
    return this.signupForm.get('known');
  }
  get workAs() {
    return this.signupForm.get('workAs');
  }

  get haveKids() {
    return this.signupForm.get('haveKids');
  }
  get smoke() {
    return this.signupForm.get('smoke');
  }
  get drink() {
    return this.signupForm.get('drink');
  }

  get languages() {
    return this.signupForm.get('languages');
  }
  get hair() {
    return this.signupForm.get('hair');
  }
  get repassword() {
    return this.signupForm.get('repassword');
  }
  get eyes() {
    return this.signupForm.get('eyes');
  }
  get occupation() {
    return this.signupForm.get('occupation');
  }

  get gender() {
    return this.signupForm.get('gender');
  }

  get height() {
    return this.signupForm.get('height');
  }
  get age() {
    return this.signupForm.get('age');
  }

  get country() {
    return this.signupForm.get('country');
  }
  get bodyType() {
    return this.signupForm.get('bodyType');
  }

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private ngWizardService: NgWizardService,
  ) {}

  ngOnInit() {
    this.signupForm = new FormGroup({

      username: new FormControl(''),
      firstname:  new FormControl(''),
      lastname:  new FormControl(''),
      repassword:  new FormControl(''),
      password:   new FormControl(''),
      email:  new FormControl(''),

      bodyType:  new FormControl(''),
      height:  new FormControl(''),
      eyes:  new FormControl(''),
      hair:  new FormControl(''),
      languages:  new FormControl(''),
      relationship:  new FormControl(''),
      country:   new FormControl(''),
      known:  new FormControl(''),
      workAs:   new FormControl(''),
      lookingFor:  new FormControl(''),
      bio:  new FormControl(''),
      haveKids:  new FormControl(''),
      smoke:  new FormControl(''),
      drink: new FormControl(''),
    });
  }

  signup() {
    const data = {
      username: this.username,
      email: this.email,
      password: this.password,
      repassword: this.repassword,
      bodyType: this.bodyType,
      languages: this.languages,
      relationship: this.relationship,
      known: this.known,
      firstname: this.firstname,
      lastname: this.lastname,
      age: this.age,
      country: this.country,
      gender: this.gender,
      hair: this.hair,
      height: this.height,
      occupation: this.occupation,
      smoke: this.smoke,
      havekids: this.haveKids,
      bio: this.bio,
    };

    this.submitted = true;
    const url = this.baseurl + '/signup';
    // stop here if form is invalid
    if (this.signupForm.invalid) {
      this.httpClient.post(url, JSON.stringify(data)).subscribe(data => {
        this.toastr.success('Signup complete');
      });
    }

 
  }
  validateGender(value) {
    if (value === 'default') {
      this.genderHasError = true;
    } else {
      this.genderHasError = false;
    }
  }

  stepStates = {
    normal: STEP_STATE.normal,
    disabled: STEP_STATE.disabled,
    error: STEP_STATE.error,
    hidden: STEP_STATE.hidden,
  };

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.dots,
    toolbarSettings: {
      toolbarExtraButtons: [
        {
          text: 'Finish',
          class: 'btn btn-info',
          event: () => {
            console.log('finished');
          },
        },
      ],
    },
  };

  showPreviousStep(event?: Event) {
    this.ngWizardService.previous();
  }

  showNextStep(event?: Event) {
    this.ngWizardService.next();
  }

  resetWizard(event?: Event) {
    this.ngWizardService.reset();
  }

  setTheme(theme: THEME) {
    this.ngWizardService.theme(theme);
  }

  stepChanged(args: StepChangedArgs) {
    console.log(args.step);
  }
  counter(i: number) {
    return new Array(i);
  }
  // public doSignup(){
  //  let response = this.service.createUser(this.userSignupModel);
  //   response.subscribe((data) => this.message = data);

  // }
}
