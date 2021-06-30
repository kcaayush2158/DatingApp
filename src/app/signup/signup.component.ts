import { Component, OnInit } from '@angular/core';
import { Chatroom } from '../user';
import { HttpClient } from '@angular/common/http';
import { NgWizardConfig, NgWizardService, StepChangedArgs, STEP_STATE, THEME } from 'ng-wizard';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  message: any;
  signupForm: FormGroup;
  baseurl = 'https://lovecupid.herokuapp.com/api';

  get registerFormControl() {
    return this.signupForm.controls;
  }

  get firstname() {
    return this.signupForm.get('firstname');
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
  get lookingFor() {
    return this.signupForm.get('lookingFor');
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

  get bodyType() {
    return this.signupForm.get('bodyType');
  }
  signupUser() {}

  constructor(
    private httpClient: HttpClient,
    private toastr: ToastrService,
    private ngWizardService: NgWizardService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      repassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      firstname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      lastname: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      bodyType: ['', [Validators.required]],
      height: ['', [Validators.required]],
      eyes: ['', [Validators.required]],
      hair: ['', [Validators.required]],
      languages: ['', [Validators.required]],
      relationship: ['', [Validators.required]],
      known: ['', [Validators.required]],
      workAs: ['', [Validators.required]],
      lookingFor: ['', [Validators.required, Validators.minLength(40), Validators.maxLength(300)]],
      bio: ['', [Validators.required, Validators.minLength(40), Validators.maxLength(300)]],
      haveKids: ['', [Validators.required]],
      smoke: ['', [Validators.required]],
      drink: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
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
      gender: this.gender,
      hair: this.hair,
      height: this.height,
      occupation: this.occupation,
      smoke: this.smoke,
      havekids: this.haveKids,
      bio: this.bio,
    };

    const url = this.baseurl + '/signup';
    this.httpClient.post(url, { data }).subscribe(data => {
      this.toastr.success('Signup complete');
    });
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
